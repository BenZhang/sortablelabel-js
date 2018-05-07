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