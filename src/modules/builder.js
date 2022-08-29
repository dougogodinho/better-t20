'use strict'

T20.modules.builder = {
  openBuilder () {
    const html = $(`<div>
        <div id="attributes">
          <h2>Atributos</h2><br>
          <table>
            <tr style="text-align: center; font-weight: bold; text-transform: uppercase">
              <td>Força</td><td>Destreza</td><td>Constituição</td>
              <td>Inteligência</td><td>Sabedoria</td><td>Carisma</td>
            </tr>
            <tr>
              <td style="padding: 0 2px"><input name="for" style="width: 90%; text-align: center" type="number"></td>
              <td style="padding: 0 2px"><input name="des" style="width: 90%; text-align: center" type="number"></td>
              <td style="padding: 0 2px"><input name="con" style="width: 90%; text-align: center" type="number"></td>
              <td style="padding: 0 2px"><input name="int" style="width: 90%; text-align: center" type="number"></td>
              <td style="padding: 0 2px"><input name="sab" style="width: 90%; text-align: center" type="number"></td>
              <td style="padding: 0 2px"><input name="car" style="width: 90%; text-align: center" type="number"></td>
            </tr>
          </table>
          <br>
          <h3 style="text-align: center"><small>Total em pontos:</small> <b class="points-total">0</b></h3>
        </div>
        <div><h2>Raça</h2></div>
        <div><h2>Classe</h2></div>
        <div><h2>Origem</h2></div>
        <div><h2>Divindade <small>(OPCIONAL)</small></h2></div>
        <div><h2>Magias <small>(apenas Arcanistas, Bardos, Clérigos e Druidas)</small></h2></div>
        <div><h2>Toques Finais</h2></div>
    `)
    html.find('>div').hide()
    html.find(':input').on('change', el => {
      if ($(el).val() * 1 > 18) $(el).val(18)
      if ($(el).val() * 1 < 8) $(el).val(8)
      console.log(html.find(':input').map((i, el) => $(el).val() * 1).toArray())
    })
    const dialog = T20.utils.showDialog('Construtor de personagem', html, null, { width: '650px' })
    const lastPage = html.find('>div').length - 1
    let currentPage = 0
    const back = () => {
      currentPage--
      updateView()
    }
    const next = () => {
      currentPage++
      updateView()
    }
    const finish = () => {
      alert('yeahhhh')
      dialog.dialog('close')
    }
    const updateView = () => {
      html.find('>div').hide().eq(currentPage).show()
      const buttons = {}
      if (currentPage) buttons['Voltar'] = back
      if (currentPage < lastPage) buttons['Próximo'] = next
      else buttons['Finalizar'] = finish
      dialog.dialog('option', 'buttons', buttons)
    }
    updateView()
  },
  onLoad ($body) {},
  async onSheet ($iframe, characterId) {
    const button = $('<button style="display: block; margin: auto" class="btn">Iniciar construtor de personagem!')
      .click(this.openBuilder)
    if ($iframe.find('.sheet-character-attributes [value=10]').length > 5) {
      $iframe.find('.charactersheet').prepend(button)
      await checkTimeout(() => $iframe.find('.sheet-character-attributes [value=10]').length < 6)
      button.remove()
    }
  }
}