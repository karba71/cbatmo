import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import {Colors} from "@blueprintjs/core";
import ModuleForecastDaily from "./ModuleForecastDaily";
import moment from "moment";
import {Flex} from "reflexbox";
import cx from "classnames";

import ModuleLayout from "../layouts/ModuleLayout";
import { IOpenWeatherState } from "../store/openweather/types";
import { Orientation } from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState extends WithTranslation  {
    openweather: IOpenWeatherState
    locale: string
    phone?: string
    orientation?: Orientation
    t: i18next.TFunction
}

const ModuleDate: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout label={props.t('forecast.forecast')} reachable={true} fill={true} position={!!props.phone && props.orientation === 'portrait' ? 'fixed-bottom' : undefined}>
            <div className="module-forecast">
                <ModuleForecastDaily data={props.openweather.data?.daily.data[0]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[1]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[2]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[3]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[4]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[5]} locale={props.locale} phone={props.phone} />
            </div>
            {
                props.phone && props.orientation === 'portrait' && (
                    <Flex justifyContent='space-between' style={{padding: '0 18px'}}>
                        <div className={cx(!props.openweather.data?.daily.data[0].sunrise_time && 'bp3-skeleton')}>
                            <div className="sunrise" style={{ color: Colors.GRAY4 }}>{props.t('forecast.sunrise')}</div>
                            <i className='wi wi-sunrise' style={{ color: Colors.GOLD4 }}/> {moment.unix(props.openweather.data?.daily.data[0].sunrise_time ? props.openweather.data?.daily.data[0].sunrise_time : 0).format('HH:mm')}
                        </div>
                        <div className={cx(!props.openweather.data?.daily.data[0].sunset_time && 'bp3-skeleton')}>
                            <div className="sunset" style={{ color: Colors.GRAY4 }}>{props.t('forecast.sunset')}</div>
                            <i className='wi wi-sunset' style={{ color: Colors.GOLD4 }}/> {moment.unix(props.openweather.data?.daily.data[0].sunset_time ? props.openweather.data?.daily.data[0].sunset_time : 0).format('HH:mm')}
                        </div>
                    </Flex>
                )
            }
        </ModuleLayout>
    )
};

export default withTranslation('common')(ModuleDate);
