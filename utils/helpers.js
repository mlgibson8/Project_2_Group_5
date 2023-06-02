// helpers is a collection of functions that can be used in the handlebars templates
// The format_date function takes in a timestamp and returns a date string
// The format_time function takes in a timestamp and returns a time string
// The commentLengths function takes in a comment and returns the length of the comment
module.exports = {
    format_date: (date) => {
     
      return date.toLocaleDateString();
    },
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    commentLengths: (comment) => {
      return comment.length;
    },
  };