Template.profile.helpers({
  profileFields: function() {
    return [
      { name: "firstName", required: true },
      { name: "lastName", required: true }
    ];
  }
});

Template.profile.events({
  'submit form': function(event) {
    event.preventDefault();
    var data = SimpleForm.processForm(event.target);
    Meteor.users.update(Meteor.userId(), {$set: {profile: data}});
  }
});

Template._profileField.helpers({
  profile: function() {
    if (Meteor.user()) {
      return Meteor.user().profile;
    }
  },

  isTextField: function() {
    return this.type !== 'file' && this.type !== 'text_area';
  },

  isTextArea: function() {
    return this.type === 'text_area';
  },

  isCheckbox: function() {
    return this.type === 'checkbox';
  },

  isFileField: function() {
    return this.type === 'file';
  }
});
