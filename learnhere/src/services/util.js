const quillFormats = [
  'header', 'align',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}],
    ['link']
  ],
};

export {
  quillFormats,
  quillModules
}