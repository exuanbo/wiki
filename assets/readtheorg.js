$('document').ready(function () {
  $('#text-table-of-contents ul').first().addClass('nav');
  $('body').scrollspy({ target: '#text-table-of-contents' });

  var toggleSidebar = $('<div id="toggle-sidebar"><a href="#table-of-contents"><h2>Table of Contents</h2></a></div>');
  $('#content').prepend(toggleSidebar);

  var closeBtn = $('<a class="close-sidebar" href="#">Close</a>');
  var tocTitle = $('#table-of-contents').find('h2');
  tocTitle.append(closeBtn);

  ['.outline-2 h2', '.outline-3 h3', '.outline-4 h4', '.outline-5 h5'].forEach(function (i) {
    $(i).each(function () {
      var pageUrl = window.location.pathname;
      var node = $(this).attr('id');
      var fullUrl = pageUrl + '#' + node;
      $(this).contents().last().after('<span id="permalink"><a href="' + fullUrl + '">¶</a></span>');
    });
  });
});
