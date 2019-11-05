import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

const FauxCheckboxComponent = Component.extend({
  tagName: '',

  isIndeterminate: equal('checkedState', 'indeterminate'),
  isSelected: computed('checkedState', function() {
    return this.checkedState === 'selected' || this.checkedState === true;
  }),
  isUnselected: computed('checkedState', function() {
    return this.checkedState === 'unselected' || this.checkedState === false;
  })
});

FauxCheckboxComponent.reopenClass({
  positionalParams: ['checkedState']
});

export default FauxCheckboxComponent;
