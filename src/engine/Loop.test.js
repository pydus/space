import Loop from './Loop'

const updatesPerSecond = 97

jest.useFakeTimers()

const callLimiter = {
  maxCalls: 10,
  timesCalled: 0,

  reset() {
    this.timesCalled = 0
  },

  call(callback) {
    if (this.timesCalled++ < this.maxCalls) {
      callback()
    }
  }
}

jest.spyOn(window, 'requestAnimationFrame')
  .mockImplementation(fn => callLimiter.call(fn))

afterEach(() => callLimiter.reset())

it('adds child', () => {
  const loop = Loop({ updatesPerSecond })
  const child = () => {}
  loop.add(child)
  expect(loop.children).toHaveLength(1)
  expect(loop.children).toContain(child)
})

it('initializes flag', () => {
  const loop = Loop({ updatesPerSecond })
  expect(loop.isRunning).toBe(false)
})

it('sets flag on start', () => {
  const loop = Loop({ updatesPerSecond })
  loop.start()
  expect(loop.isRunning).toBe(true)
})

it('sets flag on stop', () => {
  const loop = Loop({ updatesPerSecond })
  loop.start()
  loop.stop()
  expect(loop.isRunning).toBe(false)
})

it('runs first update immediately on start', () => {
  const loop = Loop({ updatesPerSecond, renders: false })
  const child = { update: jest.fn() }
  loop.add(child)
  expect(child.update).toBeCalledTimes(0)
  loop.start()
  expect(child.update).toBeCalledTimes(1)
})

it('updates child with correct intervals', () => {
  const loop = Loop({ updatesPerSecond, renders: false })
  const msPerUpdate = 1000 / updatesPerSecond
  const child = { update: jest.fn() }
  loop.add(child)
  loop.start()
  jest.advanceTimersByTime(msPerUpdate)
  expect(child.update).toBeCalledTimes(2)
  jest.advanceTimersByTime(msPerUpdate - 1)
  expect(child.update).toBeCalledTimes(2)
  jest.advanceTimersByTime(1)
  expect(child.update).toBeCalledTimes(3)
})

it('stops updating', () => {
  const loop = Loop({ updatesPerSecond, renders: false })
  const msPerUpdate = 1000 / updatesPerSecond
  const child = { update: jest.fn() }
  loop.add(child)
  loop.start()
  loop.stop()
  jest.advanceTimersByTime(10 * msPerUpdate)
  expect(child.update).toBeCalledTimes(1)
})

it('renders', () => {
  const loop = Loop({ updatesPerSecond })
  const child = { update: jest.fn(), render: jest.fn() }
  loop.add(child)
  loop.start()
  expect(child.render).toBeCalledTimes(callLimiter.maxCalls)
})

it('does not render if render mode disabled', () => {
  const loop = Loop({ updatesPerSecond, renders: false })
  const child = { update: jest.fn(), render: jest.fn() }
  loop.add(child)
  loop.start()
  expect(child.render).toBeCalledTimes(0)
})
