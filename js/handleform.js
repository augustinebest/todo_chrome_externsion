$(document).ready(function() {

    var taskList = new Array();

    chrome.storage.sync.get('list', function(val) {
        if(val.list.length > 0) {
            taskList = val.list;
            // console.log(taskList)
            for(var i=0; i<taskList.length; i++) {
                addListItem(taskList[i]);
            }
        } 
    })

    $('#submit_button').click(function(e) {
        e.preventDefault()
        var taskToAdd = $('#task').val();
        taskList.push(taskToAdd);
        addListItem(taskToAdd);
        chrome.storage.sync.set({
            'list': taskList
        })
    })

    function addListItem(value) {
        document.getElementById('task').value = '';
        var ul = document.getElementById('todo_listUI');
        addUI(ul, value, 1);
    }

    function addUI(ul, value, num) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(value));
        if(value == '') {

        }else {
            ul.appendChild(li);
        }
        var span = document.createElement('span');
        var txt = document.createTextNode('done');
        if(num === 1) {
            span.className = 'close';
            span.appendChild(txt);
            li.appendChild(span);

            $('.close').click(function() {
                var index = $(this).index('.close');
                // console.log(index);
                const div = this.parentElement;
                div.style.display = 'none';
                removeItem(index);
                $('.close').eq(index).remove();
            })
        }
    }

    function removeItem(index) {
        chrome.storage.sync.get(['list'], function(val) {
            taskList = val.list;
            taskList.splice(index, 1)
            chrome.storage.sync.set({
                'list': taskList
            })
        })
    }
})