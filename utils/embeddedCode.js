export const getEmbeddedCode = ({ postId }) => {
  const embeddedCode = `<div data-id='${postId}' class="hf_widget_container"></div><script type="text/javascript">var dpaFtSc = document.createElement("script"); dpaFtSc.id = "hitzfeed_widget_script"; document.body.appendChild(dpaFtSc); dpaFtSc.async = true; dpaFtSc.src = "https://www.hitzfeed.com/trends/media/js/hitzfeed_widget_new.js"; </script>`;
  return embeddedCode;
};
