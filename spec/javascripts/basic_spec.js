describe("basic functionalities", function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = "base/spec/javascripts/fixtures";
    loadFixtures("basic.html");    
  });

  it("should be able to sort position and update labels", function() {
    $('.tag-nested-workouts').sortableLabel({
      fieldName: "workouts",
      label: 'Step'
    });

    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-3 .position-field').val()).toBe('3')
    expect($('#field1-4 .position-field').val()).toBe('4')
    expect($('#field1-1 label').text()).toBe('Step 1')
    expect($('#field1-2 label').text()).toBe('Step 2')
    expect($('#field1-3 label').text()).toBe('Step 3')
    expect($('#field1-4 label').text()).toBe('Step 4')
  });

  it("should be able to sort position and update labels according to existing positon values", function() {
    $('.tag-nested-workouts').sortableLabel({
      fieldName: "workouts"
    });

    expect($('#field2-1 .position-field').val()).toBe('2')
    expect($('#field2-2 .position-field').val()).toBe('1')
    expect($('#field2-3 .position-field').val()).toBe('4')
    expect($('#field2-4 .position-field').val()).toBe('3')
    expect($('#field2-1 label').text()).toBe('No. 2')
    expect($('#field2-2 label').text()).toBe('No. 1')
    expect($('#field2-3 label').text()).toBe('No. 4')
    expect($('#field2-4 label').text()).toBe('No. 3')
  });

  it('should be able to catch events', function() {
    var form = new SortableLabel($('#workout-1'), {
      fieldName: "workouts",
      label: 'Step'      
    });
    $('#field1-1').appendTo('#workout-1');
    $(document).trigger('nested:fieldAdded:workouts');

    expect($('#field1-1 .position-field').val()).toBe('4')
    expect($('#field1-2 .position-field').val()).toBe('1')
    expect($('#field1-3 .position-field').val()).toBe('2')
    expect($('#field1-4 .position-field').val()).toBe('3')
    expect($('#field1-1 label').text()).toBe('Step 4')
    expect($('#field1-2 label').text()).toBe('Step 1')
    expect($('#field1-3 label').text()).toBe('Step 2')
    expect($('#field1-4 label').text()).toBe('Step 3')
  });

  it('should be able to handle deleted items', function(){
    $('.tag-nested-workouts').sortableLabel({
      fieldName: "workouts",
      label: 'Step'
    });
    $('#w1_3_destroy').val('true');
    $(document).trigger('nested:fieldRemoved:workouts');
    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-4 .position-field').val()).toBe('3')
    expect($('#field1-1 label').text()).toBe('Step 1')
    expect($('#field1-2 label').text()).toBe('Step 2')
    expect($('#field1-4 label').text()).toBe('Step 3')

    $('#w1_3_destroy').val('1');
    $(document).trigger('nested:fieldRemoved:workouts');
    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-4 .position-field').val()).toBe('3')
    expect($('#field1-1 label').text()).toBe('Step 1')
    expect($('#field1-2 label').text()).toBe('Step 2')
    expect($('#field1-4 label').text()).toBe('Step 3')

    $('#w1_3_destroy').val('false');
    $(document).trigger('nested:fieldRemoved:workouts');
    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-3 .position-field').val()).toBe('3')
    expect($('#field1-4 .position-field').val()).toBe('4')
    expect($('#field1-1 label').text()).toBe('Step 1')
    expect($('#field1-2 label').text()).toBe('Step 2')
    expect($('#field1-3 label').text()).toBe('Step 3')
    expect($('#field1-4 label').text()).toBe('Step 4')
  });

  it("should be able to insert", function() {
    var form = new SortableLabel($('#workout-1'), {
      fieldName: "workouts",
      label: 'Step'      
    });
    $('<div class="fields" id="field1-5"><label></label><a class="remove_nested_fields" data-association="workouts"></a><input id="5_destroy" value="false"><input class="position-field"></div>')
      .appendTo('#workout-1');
    form.calStepLable();

    expect($('#field1-1 .position-field').val()).toBe('1')
    expect($('#field1-2 .position-field').val()).toBe('2')
    expect($('#field1-3 .position-field').val()).toBe('3')
    expect($('#field1-4 .position-field').val()).toBe('4')
    expect($('#field1-5 .position-field').val()).toBe('5')
    expect($('#field1-1 label').text()).toBe('Step 1')
    expect($('#field1-2 label').text()).toBe('Step 2')
    expect($('#field1-3 label').text()).toBe('Step 3')
    expect($('#field1-4 label').text()).toBe('Step 4')
    expect($('#field1-5 label').text()).toBe('Step 5')
  });

  it("should be able to initialize new fields", function() {
    $('.tag-nested-workouts').sortableLabel({
      label: 'Step',
      fieldName: "workouts"
    });
    expect($('#workout-1').hasClass('sortable-label-workouts')).toBe(true);
    expect($('#workout-2').hasClass('sortable-label-workouts')).toBe(true);
    $('<div class="tag-nested-workouts" id="workout-3"><div class="fields" id="field3-1"><label></label><a class="remove_nested_fields" data-association="workouts"></a><input id="5_destroy" value="false"><input class="position-field"></div></div>')
      .appendTo('body');
    $('.tag-nested-workouts').sortableLabel({
      label: 'Step',
      fieldName: "workouts"
    });

    expect($('#workout-1').hasClass('sortable-label-workouts')).toBe(true);
    expect($('#workout-2').hasClass('sortable-label-workouts')).toBe(true);
    expect($('#workout-3').hasClass('sortable-label-workouts')).toBe(true);
    expect($('#field3-1 .position-field').val()).toBe('1')
    expect($('#field3-1 label').text()).toBe('Step 1')
  });

  it('#initSortByPosition', function(){
    $('#field1-2 .position-field').val(1);
    $('#field1-3 .position-field').val(2);
    $('#workout-1').sortableLabel({
      fieldName: "workouts",
      label: 'Step'
    });

    expect($('#field1-1 .position-field').val()).toBe('3')
    expect($('#field1-2 .position-field').val()).toBe('1')
    expect($('#field1-3 .position-field').val()).toBe('2')
    expect($('#field1-4 .position-field').val()).toBe('4')
    expect($('#field1-1 label').text()).toBe('Step 3')
    expect($('#field1-2 label').text()).toBe('Step 1')
    expect($('#field1-3 label').text()).toBe('Step 2')
    expect($('#field1-4 label').text()).toBe('Step 4')
  });

  it('#calStepLable', function() {
    var form = new SortableLabel($('#workout-1'), {
      fieldName: "workouts",
      label: 'Step'      
    });
    $('#field1-1').appendTo('#workout-1');
    form.calStepLable();

    expect($('#field1-1 .position-field').val()).toBe('4')
    expect($('#field1-2 .position-field').val()).toBe('1')
    expect($('#field1-3 .position-field').val()).toBe('2')
    expect($('#field1-4 .position-field').val()).toBe('3')
    expect($('#field1-1 label').text()).toBe('Step 4')
    expect($('#field1-2 label').text()).toBe('Step 1')
    expect($('#field1-3 label').text()).toBe('Step 2')
    expect($('#field1-4 label').text()).toBe('Step 3')

    $('#field1-3').remove();
    form.calStepLable();
    expect($('#field1-1 .position-field').val()).toBe('3')
    expect($('#field1-2 .position-field').val()).toBe('1')
    expect($('#field1-4 .position-field').val()).toBe('2')
    expect($('#field1-1 label').text()).toBe('Step 3')
    expect($('#field1-2 label').text()).toBe('Step 1')
    expect($('#field1-4 label').text()).toBe('Step 2')
  });

  // Workout group label test

  // it("workout group label", function() {
  //   $('#test-part4').sortableLabel({
  //     fieldName: 'test_field',
  //     labelTarget: 'label[rel=m]',
  //     weekGroupLabelTarget: '.test_group_label'
  //   });

  //   var allElements = $('#test-part4 .fields');
  //   $(allElements[2]).insertBefore($(allElements[0])).trigger('sortableLabel:refresh');

  //   var expectedWorkoutGroupId = '3124',
  //       targetWorkoutGroupId = '',
  //       expectedGroupLabel = 'A 1A 2B 1B 2',
  //       targetGroupLabel = '';

  //   $('#test-part4 .test_group_label').each(function(index, item) {
  //     targetWorkoutGroupId += $(item).attr('id');
  //     targetGroupLabel += $(item).text();
  //   });

  //   expect(targetWorkoutGroupId).toBe(expectedWorkoutGroupId);
  //   expect(targetGroupLabel).toBe(expectedGroupLabel);
  // });
});