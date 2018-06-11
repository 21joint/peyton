import 'index.scss';
import 'html-loader!./index.html';

(function () {
  var url = 'https://cors-anywhere.herokuapp.com/http://api.publicinput.com:8099/Api/HighlightedComments?key=ser31d0ood0jne967olxy0wwyqng9chf&set=test';

  getAjax(url, generateHTML);

  function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status == 200)
        success(xhr.responseText);
        removeClass(document.getElementById('app'), 'loading');
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }
  function generateComments(data) {
    var _data = JSON.parse(data);
    var comments = '';
    for (var j = 0; j < _data.length; j++) {
      var comment = _data[j].comment;
      comments += `<li><p class="m-0">${comment}</p></li>`;
    }
    return '<ul class="app-topic--comments">' + comments + '</ul>';
  }
  function generateHTML(data) {
    let commentsHtml = generateComments(data);
    document.getElementById('app').innerHTML = `
                      <div class="container-fluid">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="app-topic">
                              <div class="app-topic--header">
                                <h2 class="app-topic--title">The Project Title</h2>
                                <div><a href="" role="button" class="btn btn-join"><b>Join The Conversation</b></a></div>
                              </div>
                              <div class="app-topic--body scrollable-y">
                                <h3><i>The question goes here...</i></h3>
                                ${commentsHtml}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;
  }
  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    }
  }
})();
