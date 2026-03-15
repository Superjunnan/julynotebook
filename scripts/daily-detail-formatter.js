const { parse } = require('node-html-parser');

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout !== 'post' || data.app_type !== 'daily') return data;

  try {
    const root = parse(data.content);
    let candidateCount = '0';
    
    // Extract candidate count and strip intro blockquotes
    const blockquotes = root.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
      const text = bq.text.trim();
      const match = text.match(/今日候选总数[：:\s]*(\d+)/);
      if (match) {
        candidateCount = match[1];
        bq.remove();
      } else if (text.startsWith('主线：') || text.includes('今日主线')) {
        bq.remove();
      }
    });
    
    data.app_daily_candidates = candidateCount;

    // Traverse and wrap H3 contents into cards
    const childNodes = root.childNodes;
    let newHtml = '';
    let inCard = false;
    
    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];
        const tagName = node.tagName ? node.tagName.toUpperCase() : '';
        
        if (tagName === 'H2') {
            if (inCard) { newHtml += '</div>'; inCard = false; }
            
            // Format H2 as section title
            node.setAttribute('class', 'daily-section-title');
            newHtml += node.toString();
            
        } else if (tagName === 'H3') {
            if (inCard) { newHtml += '</div>'; }
            inCard = true;
            newHtml += '<div class="daily-news-card">';
            
            // Format H3 as card title
            node.setAttribute('class', 'daily-news-card-title');
            // Clean up the text if it starts with "01 · " to "1. "
            let text = node.text.trim();
            text = text.replace(/^0*(\d+)\s*[\·\-\.]\s*/, '$1. ');
            node.set_content(text); // replaces inner html
            
            newHtml += node.toString();
            
        } else if (node.nodeType === 1) { // Element node
            if (inCard && tagName === 'P') {
                if (node.text.includes('参考：') || node.text.includes('参考来源')) {
                   node.setAttribute('class', 'daily-news-card-refs');
                   let html = node.innerHTML;
                   html = html.replace(/参考(来源)?[\s:：]*/, '<span class="refs-label">参考来源：</span>');
                   node.set_content(html);
                } else {
                   node.setAttribute('class', 'daily-news-card-body');
                }
            }
            newHtml += node.toString();
        } else {
            // Text nodes or comments
            newHtml += node.toString();
        }
    }
    
    if (inCard) newHtml += '</div>';
    
    data.content = newHtml;

  } catch (error) {
    console.error('daily-detail-formatter error:', error);
  }

  return data;
}, 20); // Run after app-post-meta (which relies on original content)
