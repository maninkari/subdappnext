import WasmComp from '../../src/components/wasmComponent'

describe('wasmComponent loads video and captures frame', () => {
  it('mounts', () => {
    const client = { putObject: () => {} }

    cy.mount(<WasmComp client={client} />)
    cy.spy(client, 'putObject')
    cy.wait(1000)

    cy.get('#mirrorConvolute').then(($canvas) => {
      const w = $canvas.width()
      const h = $canvas.height()
      let a = $canvas[0].toDataURL()

      cy.get('#btn-capture')
        .click()
        .then(() => {
          cy.wait(1000)
          const b = $canvas[0].toDataURL()
          assert.notEqual(b, a, 'canvas updated')
        })
    })

    cy.get('#btn-save')
      .click()
      .then(() => {
        expect(client.putObject).to.be.called
      })
  })
})
