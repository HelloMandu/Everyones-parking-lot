import { useCallback, useEffect } from 'react';

export const useScrollEnd = (callback, dom) => {
    const handleScroll = useCallback(() => {
        const endPoint = dom
            ? Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight) < 5
            : Math.abs(
                  window.innerHeight +
                      document.documentElement.scrollTop -
                      document.documentElement.scrollHeight,
              ) < 5;
        if (endPoint) {
            callback();
        }
    }, [callback, dom]);
    useEffect(() => {
        if (dom) {
            dom.addEventListener('scroll', handleScroll);
            return () => dom.removeEventListener('scroll', handleScroll);
        } else {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll, dom]);
};

export const useScrollRemember = (URL, dom) => {
    const rememberScrollTop = useCallback(() => {
        if (dom) {
            sessionStorage.setItem(`${URL}/scrollTop`, dom.scrollTop);
        } else {
            sessionStorage.setItem(
                `${URL}/scrollTop`,
                document.documentElement.scrollTop,
            );
        }
    }, [URL, dom]);
    useEffect(() => {
        if (!URL) {
            return;
        }
        const scrollTop = sessionStorage.getItem(`${URL}/scrollTop`);
        if (dom) {
            if (scrollTop) {
                dom.scrollTo(0, scrollTop);
            }
            dom.addEventListener('scroll', rememberScrollTop);
            return () => dom.removeEventListener('scroll', rememberScrollTop);
        } else {
            if (scrollTop) {
                window.scrollTo(0, scrollTop);
            }
            window.addEventListener('scroll', rememberScrollTop);
            return () =>
                window.removeEventListener('scroll', rememberScrollTop);
        }
    }, [URL, dom, rememberScrollTop]);
};

export const useScrollTop = () => useEffect(() => window.scrollTo(0, 0), []);
