const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

describe('#todoRepository', ()=> {
  let todoRepository 
  let sandbox
  before(() => {
    todoRepository = new TodoRepository()
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('methods signature', () => {
    it('should call insertOne from lokijs', () => {
      const functionName = "insertOne"
      
      sandbox.stub(
        todoRepository.schedule, 
        functionName
        ).returns(true)
        
        const data = {
          mame: "Lucas"
        }

      const result = todoRepository.create(data)
    
      expect(result).to.be.ok
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
    it('should call find from lokijs', () => {
      const mockDatabase = [
        {
          name: 'Lucas Souza',
          age: 20,
          meta: { revision: 0, created: 1611627717306, version: 0 },
          '$loki': 1
        },
      ]

      const functionName = "find"
      
      sandbox.stub(
        todoRepository.schedule, 
        functionName
      ).returns(mockDatabase)
      
      const result = todoRepository.list()
    
      expect(result).to.be.deep.equal(mockDatabase)
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok

    })
  })
})