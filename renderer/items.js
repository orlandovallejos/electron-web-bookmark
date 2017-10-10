exports.pages = JSON.parse(localStorage.getItem('pages')) || [];

exports.saveItems = () => {
  localStorage.setItem('pages', JSON.stringify(this.pages));
}

exports.selectItem = (e) => {
  $('.read-item').removeClass('is-active');
  $(e.currentTarget).addClass('is-active');
};

exports.addItem = (item) => {
  //Hide "no items" message:
  $('#no-items').hide();

  //Create the template:
  let template = `
    <a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
      <figure class="image has-shadow is-64x64 thumb">
        <img src="${item.screenshot}">
      </figure>
      <h2 class="title is-4 column">
        ${item.url}
      </h2>
    </a>
  `;

  $('#read-list').append(template);

  //Off click events:
  $('.read-item').off('click');
  $('.read-item').off('dblclick');
  $('.read-item').on('click', (e) => {
    this.selectItem(e);
  });
  $('.read-item').on('dblclick', (e) => {
    window.openItem();
  });
}

//Give global access to this function:
window.openItem = () => {

  let targetItem = $('.read-item.is-active');
  let contentURL = targetItem.data('url');
  let contentTitle = targetItem.data('title');
  // console.log('Opening item...');
  // console.log(contentURL);

  let codedURL = encodeURIComponent(contentURL);

  //Get item index to pass to the proxy window:
  let itemIndex = targetItem.index() - 1;

  let readerWinURL = `file://${__dirname}/reader.html?url=${codedURL}&itemIndex=${itemIndex}`;
  // console.log(readerWinURL);
  //Open the url in a new window:
  let readerWin = window.open(readerWinURL, contentTitle);
}

//Give global access to this function:
//window event handler to delete an item:
window.deleteItem = (i = false) => {

  //If index is not set:
  if (!i) {
    i = ($('.read-item.is-active').index() - 1);
  }

  //Remove item from DOM:
  $('.read-item').eq(i).remove();

  //Remove item from array:
  this.pages = this.pages.filter((item, index) => {
    return index !== i;
  });

  //Remove from localStorage:
  this.saveItems();

  //Mark as selected another item:
  if (this.pages.length > 0) {
    let newIndex = (i === 0) ? 0 : i - 1;

    $('.read-item').eq(newIndex).addClass('.is-active');
  }
  else {
    $('#no-items').show();
  }
};

// Open item in default browser
window.openInBrowser = () => {

  // Only if items exists
  if (!this.pages.length) { 
    return; 
  }

  // Get selected item
  let targetItem = $('.read-item.is-active')

  // Open in Browser
  require('electron').shell.openExternal(targetItem.data('url'))
}