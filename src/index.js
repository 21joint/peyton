import 'index.scss';
import 'html-loader!./index.html';
import _ from 'lodash'
import 'lodash/each';
import 'lodash/groupBy';
import 'lodash/sortBy';
import 'lodash/reverse';


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

  function generateHTML(data) {
    var _data = _.sortBy(_.groupBy(JSON.parse(data), 'project.id'), 'length').reverse();
    var _res = '';
    _.each(_data, function (project) {
      var _commentsHtml = '';
      var articleTitle = '';
      var projectName = '';
      _.each(project, function (dt) {
        console.log(dt);
        projectName = dt.project.name;
        _commentsHtml += '<li><p class="m-0">' + dt.comment + '</p></li>';
        articleTitle = dt.article.name;
      });
      _res += `<div class="col-md-4">
                            <div class="app-topic">
                              <div class="app-topic--header">
                                <h2 class="app-topic--title">${projectName}</h2>
                                <div><a href="#" role="button" class="btn btn-join"><b>Join The Conversation</b></a></div>
                              </div>
                              <div class="app-topic--body scrollable-y">
                                <h3><i>${articleTitle}</i></h3>
                                <ul>${_commentsHtml}</ul>
                              </div>
                            </div>
                          </div>`;
    });
    document.getElementById('app').innerHTML = `<div class="container-fluid"><div class="row">${_res}</div></div>`;
  }

  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ')
    }
  }
})();
