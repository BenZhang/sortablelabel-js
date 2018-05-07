describe("nested functionalities", function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = "base/spec/javascripts/fixtures";
    loadFixtures("nested.html");    
  });

  it('should init nested form', function(){
    $('.tag-nested-workouts').sortableLabel({
      fieldName: "workouts",
      label: 'Step',
      labelTarget: '[rel="workout-label"]',
      stop: function() {
        $('.tag-nested-workout_weeks').sortableLabel({
          fieldName: 'workout_weeks',
          label: 'Week'
        });
      }
    });

    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-3 .position-field').val()).toBe('3')
    expect($('#field1-4 .position-field').val()).toBe('4')
    expect($('#field1-1 label[rel="workout-label"]').text()).toBe('Step 1')
    expect($('#field1-2 label[rel="workout-label"]').text()).toBe('Step 2')
    expect($('#field1-3 label[rel="workout-label"]').text()).toBe('Step 3')
    expect($('#field1-4 label[rel="workout-label"]').text()).toBe('Step 4')

    expect($('#field1-1-1 .position-field').val()).toBe('1')
    expect($('#field1-1-2 .position-field').val()).toBe('2')
    expect($('#field1-1-1 label').text()).toBe('Week 1')
    expect($('#field1-1-2 label').text()).toBe('Week 2')

    expect($('#field1-2-1 .position-field').val()).toBe('1')
    expect($('#field1-2-2 .position-field').val()).toBe('2')
    expect($('#field1-2-1 label').text()).toBe('Week 1')
    expect($('#field1-2-2 label').text()).toBe('Week 2')
  });
});