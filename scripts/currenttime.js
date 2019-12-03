var apikey = 'AIzaSyCtrwAbkRH6ZpWL7OCW844JP9cF_8KcI3o'

function currentlocaltime(divid, loc) {
    var container = document.getElementById(divid)
    var targetDate = new Date()
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey

    var xhr = new XMLHttpRequest()
    xhr.open('GET', apicall)
    xhr.onload = function () {
        if (xhr.status === 200) {
            var output = JSON.parse(xhr.responseText)
            if (output.status == 'OK') {
                var offsets = output.dstOffset * 1000 + output.rawOffset * 1000
                var localdate = new Date(timestamp * 1000 + offsets)
                var refreshDate = new Date()
                var millisecondselapsed = refreshDate - targetDate
                localdate.setMilliseconds(localdate.getMilliseconds() + millisecondselapsed)
                setInterval(function () {
                    localdate.setSeconds(localdate.getSeconds() + 1)
                    container.innerHTML = localdate.toLocaleTimeString()
                }, 1000)
            }
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status)
        }
    }
    xhr.send() // send request
}

currentlocaltime('localtime', '41.888495, -87.635354')