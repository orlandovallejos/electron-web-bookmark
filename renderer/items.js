exports.pages = JSON.parse(localStorage.getItem('pages')) || [];

exports.saveItems = () => {
  localStorage.setItem('pages', JSON.stringify(this.pages));
}

exports.addItem = (item) => {
  //Hide "no items" message:
  $('#no-items').hide();

  //Create the template:
  let template = `
    <a class="panel-block read-item">
      <figure class="image has-shadow is-64x64 thumb">
        <img src="${item.screenshot}">
      </figure>
      <h2 class="title is-4 column">
        ${item.url}
      </h2>
    </a>
  `;

  $('#read-list').append(template);
}