var main = function (){
    $(".section2").addClass('hidden');
    $(".section3").addClass('hidden');
    $(".submit").click(function (event) {
        var parent = $(this).parent();
        var next = parent.next();
        if (next.length === 0) {
            var sections = $('.interactive').children();
            next = sections.first();
        }
        if ($(this).hasClass('score')) {
            var text1 = $('.text1').val();
            var text2 = $('.text2').val();
            var result = calculateScore(text1, text2);
            document.getElementById("text3").innerHTML = "Your score was " + String(result) + "%";
        }
        parent.addClass('hidden');
        next.removeClass('hidden');
    });

};

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
    var similarity = similarity_num / similarity_den * 100;
    return similarity.toPrecision(4);
};

$(document).ready(main);

