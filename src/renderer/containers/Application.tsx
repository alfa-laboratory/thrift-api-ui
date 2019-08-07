import { hot } from 'react-hot-loader/root';
import React from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Layout } from '../components/Layout';
import { setThriftSource, showSelectThriftPathDialog, showSettings } from '../actions/settings';
import { thriftSrcPathSelector } from '../selectors/settings';
import { SettingsContainer } from './SettingsContainer';
import { isThriftParsedSelector, isThriftParsingInProgressSelector } from '../selectors/services';
import { AppLoader } from '../components/AppLoader';
import { EmptyAppPlaceholder } from '../components/EmptyAppPlaceholder';
import { useOnMount } from '../utils/useOnMount';
import { submitRequest } from '../actions/editor';

export const Application = hot(() => {
    const dispatch = useDispatch();
    const getState = useStore().getState;
    const thriftSrcPath = useSelector(thriftSrcPathSelector);
    const isThriftLoaded = useSelector(isThriftParsedSelector);
    const isThriftLoading = useSelector(isThriftParsingInProgressSelector);

    useOnMount(() => {
        if (thriftSrcPath) {
            dispatch(setThriftSource(thriftSrcPath));
        }

        ipcRenderer.on('showSettings', () => {
            dispatch(showSettings());
        });

        ipcRenderer.on('submitRequest', () => {
            submitRequest()(dispatch, getState);
        });
    });

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
