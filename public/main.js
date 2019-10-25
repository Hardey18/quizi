let questions;
$(function (){

    var $orders = $('#orders');
    var $question = $('#question');
    var $option1 = $('#option1');
    var $option2 = $('#option2');
    var $option3 = $('#option3');
    var $option4 = $('#option4');
    var $answer = $('#answer');

    var orderTemplate = $('#order-template').html();

    // "<li class=top>" + 
    // "<p><strong>NAME:</strong> {{name}}</p>" + 
    // "<p><strong>DRINK:</strong> {{drink}}</p>" + 
    // "<button data-id='{{id}}' class='remove'>X</button>" +
    // "</li>";

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    }

    $.ajax({
        type: 'GET',
        url: 'order',
        success: function(orders) {
            questions = orders;
            $.each(orders, function(i, order) {
                addOrder(order)
            });
        },
        error: function() {
            alert('error loading orders');
        }
    });

    $('#add-order').on('click', function() {
        var order = {
            question: $question.val(),
            option1: $option1.val(),
            option2: $option2.val(),
            option3: $option3.val(),
            option4: $option4.val(),
            answer: $answer.val(),
        };

        $.ajax({
            type: 'POST',
            url: 'order',
            data: order,
            success: function(newOrder) {
                addOrder(newOrder);
            },
            error: function() {
                alert('error saving order');
            }
        });
//        $('button').after('<p>Order added successfully!</p>')
        alert('Question added successfully');

        document.getElementById('myForm').reset();
    });

    $orders.delegate('.remove', 'click', function() {
        var $li = $(this).closest('li');
        

        $.ajax({
            type: 'DELETE',
            url: 'order' + "/" + $(this).attr('data-id'),
            success: function (){
                $li.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    });
    
    $orders.delegate('.editOrder', 'click', function() {
        var $li = $(this).closest('li');
        $li.find('input.topquestion').val($li.find('h2.topquestion').html() );
        $li.addClass('edit');
    });
    
    $orders.delegate('.saveEdit', 'click', function() {
        var $li = $(this).closest('li');
        var order = {
            question: $li.find('input.topquestion').val(),
        };
        
        $.ajax({
            type: 'PUT',
            url: 'order' + "/" + $li.attr('data-id'),
            data: order,
            success: function(newOrder) {
                $li.find('h2.topquestion').html(order.question);
                $li.removeClass('edit');
            },
            error: function() {
                alert('error updating question');
            }
        });
    });
});
