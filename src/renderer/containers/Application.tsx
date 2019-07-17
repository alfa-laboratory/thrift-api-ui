import { hot } from 'react-hot-loader/root';
import React from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { setThriftSource, showSelectThriftPathDialog, showSettings } from '../actions/settings';
import { thriftSrcPathSelector } from '../selectors/settings';
import { SettingsContainer } from './SettingsContainer';
import { isThriftParsedSelector, isThriftParsingInProgressSelector } from '../selectors/services';
import { AppLoader } from '../components/AppLoader';
import { EmptyAppPlaceholder } from '../components/EmptyAppPlaceholder';

export const Application = hot(() => {
    const dispatch = useDispatch();
    const thriftSrcPath = useSelector(thriftSrcPathSelector);
    const isThriftLoaded = useSelector(isThriftParsedSelector);
    const isThriftLoading = useSelector(isThriftParsingInProgressSelector);

    React.useEffect(() => {
        if (thriftSrcPath) {
            dispatch(setThriftSource(thriftSrcPath));
        }
    }, []);

    React.useEffect(() => {
        ipcRenderer.on('showSettings', () => {
            dispatch(showSettings());
        });
    }, []);

    function handleChoose() {
        dispatch(showSelectThriftPathDialog());
    }

    return (
        <>
            { isThriftLoaded && <Layout /> }
            { isThriftLoading && <AppLoader /> }
            { (!isThriftLoaded && !isThriftLoading) && <EmptyAppPlaceholder onChooseClick={ handleChoose } /> }
            <SettingsContainer />
        </>
    );
});
