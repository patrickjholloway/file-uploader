import Helper from '@ember/component/helper';

export default Helper.extend({
  compute(val) {
    return !val[0];
  }
});
