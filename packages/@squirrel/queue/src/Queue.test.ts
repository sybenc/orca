import Queue from './Queue'

describe('@squirrel/queue', () => {
  let queue: Queue<number>

  beforeEach(() => {
    queue = new Queue<number>()
  })

  test('开始的时候，队列应该是空的', () => {
    expect(queue.isEmpty()).toBe(true)
    expect(queue.length).toBe(0)
    expect(queue.peek()).toBe(undefined)
    expect(queue.dequeue()).toBe(undefined)
  })

  test('向队列中添加、移除元素', () => {
    queue.enqueue(1, 2, 3)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.length).toBe(3)
    expect(queue.peek()).toBe(1)
    expect(queue.dequeue()).toBe(1)
    expect(queue.length).toBe(2)
    expect(queue.peek()).toBe(2)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.length).toBe(0)
    expect(queue.peek()).toBeUndefined()
  })

  test('将队列序列化为字符串', ()=>{
    expect(queue.toString()).toBe('')
    queue.enqueue(1, 2, 3)
    expect(queue.toString()).toBe('1,2,3')
  })
})