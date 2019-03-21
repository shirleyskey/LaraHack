$(document).ready(function () {



    jQuery.validator.addMethod(
        'regex',

        function (value, element, regexp) {

            var re = new RegExp(regexp);

            return this.optional(element) || re.test(value);

        },

        "type the correct value"
    );


    $('#register').validate({

        rules: {

            first_name: {

                required: true,

                minlength: 3

            },

            last_name: {

                required: true,

                minlength: 3

            },

            birthday: {

                required: true,

            },


            phone: {

                required: true,

                minlength: 10,

                regex: "^(((00213|\\+213|0)(5|6|7)[0-9]{8})|)$"

            },

            email: {

                required: true,

                email: true

            },

            github: {

                required: false,

                url: true

            },

            linked_in: {

                required: false,

                url: true

            },


            motivation: {

                required: true,

                minlength: 20,

                maxlength: 3000

            },

            skills: {

                required: true,

                minlength: 20,

                maxlength: 3000

            },

        },

        messages: {

            first_name: {

                required: "come on, you have a name, don't you?",

                minlength: "your name must consist of at least 3 characters"

            },

            last_name: {

                required: "come on, you have a name, don't you?",

                minlength: "your name must consist of at least 3 characters"

            },

            birthday: {

                required: "come on, you have a birthday, don't you?",

            },

            phone: {

                required: "come on, you have a number, don't you?",

                minlength: "your Number must consist of at least 10 characters",

                regex: "plz enter a valid phone number"

            },

            email: {

                required: "no email, no registration"

            },

            github: {

                url: "no..no, you have to write a valid url (http://github.com/metourni)"

            },

            linked_in: {

                url: "no..no, you have to write a valid url (http://linked-in.com/metourni)"

            },

            motivation: {

                required: "um...yea, you have to write something to send this form.",

                minlength: "thats all? really?"

            },

            skills: {

                required: "um...yea, you have to write something to send this form.",

                minlength: "thats all? really?"

            },

        },

        submitHandler: function (form) {
            $('#submitButton').off('click');
            //console.log($(this).serialize());
            $.ajax({
                headers: { 'X-CSRF-TOKEN': token },
                type: "POST",
                url: storeRoute,
                dataType: 'json',
                data: $('#register').serialize(),
                beforeSend: function () {
                    $(document.body).css({ 'cursor': 'wait' });
                },
                success: function (data) {
                    $(document.body).css({ 'cursor': 'default' });
                    $('#register').hide();
                    $('#hideFinal').hide();
                    $('#registrationDone').show();
                    if (data.code != null) {
                        $('#statement').append('Registration done ! Your team\'s name is : <p style="color: green"> ' + data.name + ' </p> Your team\'s code is : <p style="color: red">' + data.code + '</p> Share it only with your teammates ! ');
                    }
                    else {
                        $('#statement').append('Registration done !');
                    }
                    console.log(data);
                },
                error: function (response) {
                    $(document.body).css({ 'cursor': 'default' });
                    $('#register').hide();
                    $('#hideFinal').hide();
                    $('#registrationDone').show();
                    $('#statement').text('That\' an unxpected error , refresh and try again !');
                }

            });
        }
    });

});