import React from 'react';
import { PullToRefresh, PullDownContent, RefreshContent, ReleaseContent } from 'react-js-pull-to-refresh';


const PullToRefreshContainer = ({ onRefresh, children, isTop }) => {
    return (
        <PullToRefresh
            pullDownContent={<PullDownContent />}
            releaseContent={<ReleaseContent />}
            refreshContent={<RefreshContent />}
            pullDownThreshold={200}
            onRefresh={onRefresh}
            triggerHeight={isTop ? "100vh" : 0}
            backgroundColor='white'
            startInvisible={true}
        >
            {children}
        </PullToRefresh>
    );
};

export default PullToRefreshContainer;