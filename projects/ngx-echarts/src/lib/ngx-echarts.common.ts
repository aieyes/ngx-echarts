export const RESOURCE: any = {
  echarts: {
    src: null,
    loaded: false
  }
};

export function loadRes(name: string) {
  return new Promise((resolve, reject) => {
    // resolve if already loaded
    if (RESOURCE[name].loaded) {
      console.log('echarts loaded');
      resolve({res: name, loaded: true, status: 'Already Loaded'});
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = RESOURCE[name].src;
      appendResource(name, script, resolve);
    }
  });
}

export function appendResource(name, res, resolve) {
  if (res.readyState) {  // IE
    res.onreadystatechange = () => {
      if (res.readyState === 'loaded' || res.readyState === 'complete') {
        res.onreadystatechange = null;
        RESOURCE[name].loaded = true;
        resolve({res: name, loaded: true, status: 'Loaded'});
      }
    };
  } else {  // Others
    res.onload = () => {
      RESOURCE[name].loaded = true;
      resolve({res: name, loaded: true, status: 'Loaded'});
    };
  }
  res.onerror = (error: any) => resolve({res: name, loaded: false, status: 'Loaded'});
  document.getElementsByTagName('head')[0].appendChild(res);
}
