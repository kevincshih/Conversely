var main = function () {
    $(".sub2").addClass('hidden');
    $(".section2").addClass('hidden');
    $("#btn1").click(function (event) {
        var text1 = $('#text1').val();
        dialog = text1.split(/[\r\n]+/);
        if (dialog.length >= 2) {
            $(".section1").addClass('hidden');
            $(".section2").removeClass('hidden');
            handleNextPrompt();
        }
    });
    $("#btn2").click(function (event) {
        var text2 = $('#text2').val();
        handleDialogResponse(text2);
        $('#text2').val("");
        if (dialog.length >= 2) {
            handleNextPrompt();
        }
        else {
            $(".sub1").addClass('hidden');
            $(".sub2").removeClass('hidden');
        }
    });
    $("#btn3").click(function (event) {
        $(".sub2").addClass('hidden');
        $(".sub1").removeClass('hidden');
        $('#text1').val("");
        document.getElementById("placeholder").innerHTML = "";
        $(".section2").addClass('hidden');
        $(".section1").removeClass('hidden');
    });
};

var dialog = new Array();
var scores = new Array();

var prompt, expected;

var handler, count;

var getAverage = function(array){
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i]
    }
    if (array.length > 0) {
        return sum / array.length;
    }
    else {
        return 0;
    }
}

var handleNextPrompt = function () {
    prompt = dialog.shift();
    expected = dialog.shift();
    var s1 = "Prompt: " + prompt + '\r\n';
    document.getElementById("placeholder").innerHTML += s1;
}

var handleDialogResponse = function (response) {
    var score = calculateScore(expected, response);
    scores.push(score);
    var s2 = "Expected Response: " + expected + '\r\n';
    var s3 = "Your Response: " + response + '\r\n';
    var s4 = "Your Score: " + String(score) + '%' + '\r\n';
    document.getElementById("placeholder").innerHTML += s2 + s3 + s4;
}

var setCountDown = function (seconds) {
    count = seconds;
    var updateCountDown = function () {
        count--;
        if (count <= 0) {
            $(".score").trigger('click');
        }
        else {
            document.getElementById("timer").innerHTML = String(count);
        }
    }
    handler = setInterval(updateCountDown, 1000);
}

var clearCountDown = function () {
    clearInterval(handler);
    document.getElementById("timer").innerHTML = '';
}

var calculateTime = function (length) {
    return 10 + Math.floor(length / 5);
}

var calculateScore = function (sa1, sa2) {

    var s1 = sa1.replace(/\s/g, "").toLowerCase();
    var s2 = sa2.replace(/\s/g, "").toLowerCase();

    if (s1.length > s2.length) {
        var temp = s1;
        s1 = s2;
        s2 = temp;
    }

    
    function intersect(arr1, arr2) {
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                r.push(v);
            }
        }
        return r;
    }
    
    var pairs = function(s){
        // Get an array of all pairs of adjacent letters in a string
        var pairs = [];
        for(var i = 0; i < s.length - 1; i++){
            pairs[i] = s.slice(i, i+2);
        }
        return pairs;
    }    
    
    var similarity_num = 2 * intersect(pairs(s1), pairs(s2)).length;
    var similarity_den = pairs(s1).length + pairs(s2).length;
    var similarity;
    if (similarity_den === 0) {
        similarity = 100;
    }
    else {
        similarity = similarity_num / similarity_den * 100;
    }
    return similarity.toPrecision(4);
};

$(document).ready(main);

