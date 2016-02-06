var main = function (){
    $(".section2").addClass('hidden');
    $(".section3").addClass('hidden');
    $(".submit").click(function (event) {
        var parent = $(this).parent();
        var next = parent.next();
        if (parent.hasClass('section1')) {
            var text1 = $('#text1').val();
            dialogue = text1.split(/[\r\n]+/);
            //dialogue = ['a', 'b', 'c'];
            parent.addClass('hidden');
            next.removeClass('hidden');
        }
        else if (parent.hasClass('section2')) {
            if (dialogue.length > 1) {
                document.getElementById("placeholder").innerHTML = String(dialogue);
                var prompt = dialogue.shift();
                var response = dialogue.shift();
            }
            else if (dialogue.length === 1) {
                var prompt = dialogue.shift();
                document.getElementById("placeholder").innerHTML = String(dialogue);
            }
            else if (dialogue.length < 1) {
                parent.addClass('hidden');
                next.removeClass('hidden');
            }
        }
        else if (parent.hasClass('section3')) {
            var sections = $('.interactive').children();
            next = sections.first();
            $('#text1').val("");
            $('#text2').val("");
            parent.addClass('hidden');
            next.removeClass('hidden');
        }
    });

};

var dialogue = new Array();

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

