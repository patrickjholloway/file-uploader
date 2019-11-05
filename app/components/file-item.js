import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: 'file-item',
  classNameBindings: ['checked:selected', 'disabled'],

  disabled: computed('status', function () {
    return this.file.status !== 'available';
  }),

  checked: computed('selectedFiles.[]', function () {
    if (this.selectedFiles) {
      return this.selectedFiles.includes(this.file);
    }
  }),

  click() {
    if (!this.checked) {
      this.selectFile(this.file);
    } else {
      this.deselectFile(this.file);
    }
  }
});
