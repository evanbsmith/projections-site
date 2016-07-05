Meteor.startup(function() {
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: '/profile',
    language: 'en',
    showSignupCode: false,
    extraSignUpFields: [{
    	field: "firstName",
    	label: "First Name",
    	type: "text",
    	required: true
    },{
        field: "lastName",
        label: "Last Name",
        type: "text",
        required: true
    }]
  });
});