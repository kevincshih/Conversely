var main = function (){
    $(".section2").addClass('hidden');
    $(".section3").addClass('hidden');
    $(".submit").click(function (event) {
        var parent = $(this).parent();
        var next = parent.next();
        if (next.length === 0) {
            var sections = $('.interactive').children();
            next = sections.first();
            $('#text1').val("");
            $('#text2').val("");
            $('#displayinput1').val("");
            $('#displayinput2').val("");
        }
        else if (next.hasClass('section2')){ 
            var text1 = $('.text1').val();
            setCountDown(calculateTime(text1.length));
        }
        else if (next.hasClass('section3')) {
            clearCountDown();
            var text1 = $('.text1').val();
            var text2 = $('.text2').val();
            var result = calculateScore(text1, text2);
            document.getElementById('displayinput1').innerHTML = text1;
            document.getElementById('displayinput2').innerHTML = text2;
            document.getElementById("text3").innerHTML = "Your score was " + String(result) + "%";
        }
        parent.addClass('hidden');
        next.removeClass('hidden');
    });

};

var handler, count;

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

