/**
 * @class Queue
 * @description 一个实现了 FIFO（先进先出）原则的通用队列类。
 *              该类支持常见的队列操作，例如 enqueue、dequeue、peek、clear、size 和 toString。
 *
 * @template T 队列中存储的元素类型。
 */
export default class Queue<T> {
  // 队列元素的内部存储。键是索引（数字），值是队列中的元素。
  #storage: { [key: number]: T } = {}

  // 队尾索引：指向队列中最后添加的元素。初始化为 -1 表示空队列。
  #rear: number = -1

  // 队首索引：指向下一个将要出队的元素。初始化为 0。
  #front: number = 0

  /**
   * 将一个或多个元素添加到队列的末尾。
   * 该操作将队尾指针向前移动，并在新的队尾位置存储元素。
   *
   * @param elements - 一个或多个要加入队列末尾的元素。
   */
  public enqueue(...elements: T[]): void {
    // 遍历每个元素，并将其添加到当前队尾索引的存储中。
    for (const element of elements) {
      this.#rear++  // 将队尾索引向前移动。
      this.#storage[this.#rear] = element
    }
  }

  /**
   * 检查队列是否为空。
   * 如果队尾索引为 -1 或者队首索引超过了队尾索引，则认为队列为空。
   *
   * @returns 如果队列为空则返回 true，否则返回 false。
   */
  public isEmpty(): boolean {
    // 如果队尾索引小于队首索引，或者队列未初始化（rear = -1），则队列为空。
    return this.#rear === -1 || this.#rear < this.#front
  }

  /**
   * 返回队列中的元素数量。
   * 计算方法是队尾索引减去队首索引，再加一。
   *
   * @returns 队列的大小。
   */
  public get length() {
    if (this.isEmpty()) return 0  // 如果队列为空，则大小为 0。
    return this.#rear - this.#front + 1  // 大小等于队尾索引减去队首索引再加一。
  }

  /**
   * 移除并返回队列前端的元素。
   * 队首指针向前移动以从队列中移除元素。
   *
   * @returns 被出队的元素，如果队列为空则返回 undefined。
   */
  public dequeue(): T | undefined {
    // 如果队列为空，返回 undefined。
    if (this.isEmpty()) return undefined

    // 获取队列前端的元素。
    const result = this.#storage[this.#front]
    // 从存储中删除该元素。
    delete this.#storage[this.#front]
    // 将队首索引向前移动到下一个元素。
    this.#front++

    // 重置索引
    if (this.#front > 1000) {
      const newStorage: { [key: number]: T } = {}
      const size = this.length
      for (let i = this.#front; i <= this.#rear; i++) {
        newStorage[i - this.#front] = this.#storage[i]
      }
      this.#storage = newStorage
      this.#rear = size - 1
      this.#front = 0
    }

    return result
  }

  /**
   * 返回队列前端的元素，但不移除它。
   *
   * @returns 队首元素，如果队列为空则返回 undefined。
   */
  public peek(): T | undefined {
    // 返回队列前端的元素，如果队列为空则返回 undefined。
    if (this.isEmpty()) return undefined
    return this.#storage[this.#front]
  }

  /**
   * 清空队列中的所有元素。
   * 这将重置存储和队首、队尾索引，实际上清空了队列。
   */
  public clear(): void {
    // 重置存储对象和两个索引。
    this.#storage = {}
    this.#rear = -1
    this.#front = 0
  }

  /**
   * 返回队列的字符串表示形式。
   * 元素以逗号分隔的列表形式呈现，从队首到队尾。
   *
   * @returns 一个包含队列中所有元素的字符串，从队首到队尾，以逗号分隔。
   */
  public toString(): string {
    // 如果队列为空，返回空字符串。
    if (this.isEmpty()) return ''

    // 从队首到队尾收集元素，并用逗号连接。
    const elements: string[] = []
    for (let i = this.#front; i <= this.#rear; i++) {
      elements.push(`${this.#storage[i]}`)  // 将每个元素添加到数组中。
    }
    return elements.join(',')
  }

  /**
   * 对队列中的每个元素应用提供的映射函数，并返回一个新的队列实例。
   *
   * @param callback - 用于转换每个元素的函数，接收元素和其索引作为参数。
   * @returns 一个新的队列实例，其中包含映射后的元素。
   */
  public map<U>(callback: (element: T, index: number) => U): Queue<U> {
    const newQueue = new Queue<U>()
    for (let i = this.#front; i <= this.#rear; i++) {
      newQueue.enqueue(callback(this.#storage[i], i - this.#front))
    }
    return newQueue
  }
}