  $(document).ready(function() {
      $('#contact_form').bootstrapValidator({
              // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
              feedbackIcons: {
                  valid: 'glyphicon glyphicon-ok',
                  invalid: 'glyphicon glyphicon-remove',
                  validating: 'glyphicon glyphicon-refresh'
              },
              fields: {
                  full_name: {
                      validators: {
                          stringLength: {
                              min: 2,
                          },
                          notEmpty: {
                              message: 'Please supply your first name'
                          }
                      }
                  },

                  email: {
                      validators: {
                          notEmpty: {
                              message: 'Please supply your email address'
                          },
                          emailAddress: {
                              message: 'Please supply a valid email address'
                          }
                      }
                  },
                  phone: {
                      validators: {
                          notEmpty: {
                              message: 'Please supply your phone number'
                          },
                          phone: {
                              country: 'US',
                              message: 'Please supply a vaild phone number with area code'
                          }
                      }
                  },

                  comment: {
                      validators: {
                          stringLength: {
                              min: 10,
                              max: 200,
                              message: 'Please enter at least 10 characters and no more than 200'
                          },
                          notEmpty: {
                              message: 'Please supply a message you would like to send'
                          }
                      }
                  }
              }
          })
          .on('success.form.bv', function(e) {
              $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
              $('#contact_form').data('bootstrapValidator').resetForm();

              // Prevent form submission
              e.preventDefault();

              // Get the form instance
              var $form = $(e.target);

              // Get the BootstrapValidator instance
              var bv = $form.data('bootstrapValidator');

              // Use Ajax to submit form data
              $.post($form.attr('action'), $form.serialize(), function(result) {
                  console.log(result);
              }, 'json');
          });
  });

  $("#send").on("click", function(event) {
event.preventDefault();
// Save the data they typed into the form input
    var fullName = $("#full_name").val().trim();
    var email = $("#email").val().trim();
    var phone = $("#phone").val().trim();
    var message = $("#message").val().trim();

    $.ajax({ 
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': "xxxxxxxx",
            'message': {
            'from_email': "xxxxxx@xxxxxx.com",
            'to': [
            {
            'email': "xxxxxxxx@xxxxxxxxxx.com",
            'name': 'xxxxxx',
            'type': 'to'
            }
            ],
            'autotext': 'true',
            'subject': 'TEST! TEST!',
            'html': 'Name: ' + name + '\nEmail: ' + email // and use it!
            }
        }
    }).done(function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
  });
  
