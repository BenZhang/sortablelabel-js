class @SortableLabel

  defaults =
    sortableItem: '> div.fields'
    labelTarget: 'label'
    positionTarget: '.position-field'
    nestedTarget: null
    removeField: "input[id$='_destroy']"
    label: null
    minimun: 0

  constructor: (scope, options) ->
    @options   = $.extend({}, defaults, options)
    @target    = scope
    @targetId  = @options['fieldName'] || @target.attr('id')
    @stop_callback  = @options["stop"]
    @initSortByPosition()
    @calInitStepLable()

    $(document).on("nested:fieldAdded:#{@targetId}", (event) =>
      @calStepLable()
      if @options['nestedTarget']
        @options['nestedTarget'].call(@target)
    )

    $(document).on("nested:fieldRemoved:#{@targetId}", (event) =>
      @calStepLable()
    )

    @target.on('sortableLabel:refresh', =>
      @target.sortable("enable")
      @calStepLable()
    )

    if @options['nestedTarget']
      @options['nestedTarget'].call(@target)

    @target.sortable(
      items: @options['sortableItem']
      placeholder: "ui-state-highlight"
      start: (event, ui)->
        $(this).find('.ui-state-highlight').css('height', $(ui.item).css('height'))
      stop: =>
        @calStepLable()
        if typeof(@stop_callback) == 'function'
          @stop_callback()
    )

    @target.on('sortableLabel:disable', =>
      @target.sortable('disable')
    )

  # 1. ascending sort if all position fields are not provided
  # 2. ascending sort field elements which part of them are no provided position
  initSortByPosition: () ->
    _option = @options
    @target.each((i, sub_target) ->
      all_fields = $(sub_target).find(_option['sortableItem'])
      _positionTarget = _option['positionTarget']
      all_remain_fields_info = []
      all_removed_fields_info = []
      maxium_position = 1

      if all_fields.length > 0

        # get the maxinum_position
        all_fields.each((index, field_item) ->
          _position = $(field_item).find(_positionTarget).val()
          if _position && _position != '' && typeof _position != 'undefined'
            _position = parseInt(_position, 10)
            if _position >= maxium_position
              maxium_position = _position
        )

        # in case that new added field position value is initialized as null or '' or undefined
        all_fields.each((index, field_item) ->
          _position = $(field_item).find(_positionTarget).val()
          if !_position || _position == '' || typeof _position != 'undefined'
            maxium_position += 1
            $(field_item).find(_positionTarget).val(maxium_position)
        )

        # filter removed fields and remain fields
        all_fields.each((index, field_item) ->
          _position = $(field_item).find(_positionTarget).val()
          _is_removed = $(field_item).find(_option['removeField']).val()
          if _is_removed == "false" || _is_removed == false
            _is_removed = "false"
          else
            _is_removed = "true"

          # removed fields should be filtered
          # only unremoved fields will be sorted
          if _is_removed == 'true'
            all_removed_fields_info.push({
              position: _position,
              j_element: field_item
            })
          else
            all_remain_fields_info.push({
              position: _position,
              j_element: field_item
            })
        )

        # 1. go through sorted array to check if a field is of same position as previous fields
        # 2. if so, update the position of later one as max position + 1
        if all_remain_fields_info.length > 0

          _tmp_remain_fields_info = all_remain_fields_info.slice()
          for field, key in _tmp_remain_fields_info
            current_position = field.position
            for previous_field, previous_key in _tmp_remain_fields_info
              tmp_position = previous_field.position
              if tmp_position == current_position && previous_key < key
                maxium_position += 1
                all_remain_fields_info[key].position = maxium_position

          all_remain_fields_info.sort((a, b) ->
            return a.position - b.position
          )

          # set remain fields position value as the acutal position in html page
          for field, key in all_remain_fields_info
            all_remain_fields_info[key].position = key + 1

        _target = $(sub_target)
        all_remain_fields_info.forEach((item, index) ->
          _target.append(item.j_element)
        )

        all_removed_fields_info.forEach((item, index) ->
          _target.append(item.j_element)
        )
    )

  calInitStepLable: ->
    this.calLabel(this.options['removeField']+'[value=false]')
    if this.options['weekGroupLabelTarget']
      this.calWeekGroupLabel(this.options['weekGroupLabelTarget'])

  calStepLable: ->
    this.calLabel(this.options['removeField']+'[value=false]')
    if this.options['weekGroupLabelTarget']
      this.calWeekGroupLabel(this.options['weekGroupLabelTarget'])

  calLabel: (target) ->
    _this = this
    $(@target).each(->
      stepCount = 1
      $(this).find(target).each( ->
        if($(this).closest('.fields').find('.remove_nested_fields').data('association') == _this.options['fieldName'])
          if _this.options['minimun'] >= stepCount
            $(this).closest('.fields').find('.remove_nested_fields').hide();
          else
            $(this).closest('.fields').find('.remove_nested_fields').show();
          $(this).closest('.fields').find(_this.options['positionTarget']).val(stepCount)
          if typeof(_this.options['label']) == 'string'
            if _this.options['label'].trim() == 'Day'
              $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.dayOfWeek(stepCount - 1))
            else
              if _this.options['fieldName']
                if $(this).parent().find('.remove_nested_fields').data('association') == _this.options['fieldName']
                  $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.options['label'] + stepCount)
              else
                alert("Field name can't be empty!")
          else if typeof(_this.options['label']) == 'function'
            $(this).closest('.fields').find(_this.options['labelTarget']).html(_this.options['label'].call($(this).closest('.fields').find(_this.options['labelTarget']), stepCount))
          else
            if !$(this).closest('.fields').find(_this.options['labelTarget']).data('label')
              labelContent = $(this).closest('.fields').find(_this.options['labelTarget']).text()
              $(this).closest('.fields').find(_this.options['labelTarget']).data('label', labelContent)
            $(this).closest('.fields').find(_this.options['labelTarget']).html("#{$(this).closest('.fields').find(_this.options['labelTarget']).data('label')} #{stepCount}")
          stepCount += 1
      )
    )
    if typeof(@stop_callback) == 'function'
      @stop_callback();


  calWeekGroupLabel: (target) ->
    _this = this
    week_group_label_list = []
    $(@target).each(->
      $(this).find(target).each(->
        tempLabel = $(this).closest('.fields').find('.workout_workout_weeks_workout_week_group_id select').find(":selected").text()
        if $(this).closest('.fields').find('.workout_workout_weeks_workout_week_group_id select').find(":selected").val() != ""
          _index = _this.isIncludeWeekGroup(tempLabel, week_group_label_list)
          if _index is -1
            week_group_label_list.push(
              name: tempLabel,
              count: 1
            )
            if typeof _this.options['subPositionTarget'] == 'string'
              $(this).closest('.fields').find(_this.options['subPositionTarget']).val(1)
            if typeof _this.options['groupLabel'] == 'string'
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel + " " + _this.options['groupLabel'] + " 1")
            else
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel)
          else if _index > -1
            week_group_label_list[_index].count += 1
            if typeof _this.options['subPositionTarget'] == 'string'
              $(this).closest('.fields').find(_this.options['subPositionTarget']).val(week_group_label_list[_index].count)
            if typeof _this.options['groupLabel'] == 'string'
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel + " " + _this.options['groupLabel'] + " " + week_group_label_list[_index].count)
            else
              $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>" + tempLabel)
        else
          $(this).html("<i class='fa fa-trophy fa-fw small-opacity-30'></i>")
      )
    )

  isIncludeWeekGroup: (item, arr)->
    if item == " " || item.trim() == ""
      return -2
    for _item, index in arr
      return index if _item.name is item
    return -1

  dayOfWeek: (dayIndex) ->
    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex]

(($) ->
  $.fn.sortableLabel = (options) ->
    new SortableLabel(this, options)
)(jQuery)
