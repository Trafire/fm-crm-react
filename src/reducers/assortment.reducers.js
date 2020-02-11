import {assortmentConstants} from "../constants"
import update from 'immutability-helper';


const INITIAL_STATE = {};

export function assortment(state = INITIAL_STATE, action) {
    switch (action.type) {

        case assortmentConstants.GET_FULL_ASSORTMENT_SUCCESS:
            const arrayToObject = (array) =>
                array.reduce((obj, item) => {
                    obj[item.assortment_code] = item
                    return obj
                }, {});
            const data = arrayToObject(action.data);

            return update(state, {$set:data});
        case assortmentConstants.GET_ASSORTMENT_BY_CODE_REQUEST:
            return update(state, {
                $merge:
                    {
                        [action.code]: {
                            loading: true,
                            code: '',
                            system: '',
                            grade: '',
                            colour: '',
                            name: '',
                            category_code: '',
                            category_name: '',
                        }
                    }
            });
        case assortmentConstants.GET_ASSORTMENT_BY_CODE_SUCCESS:
            return update(state, {
                $merge:
                    {
                        [action.code]: {
                            loading: false,
                            code: action.data.code,
                            system: action.data.system,
                            grade: action.data.grade,
                            colour: action.data.colour,
                            name: action.data.name,
                            category_code: action.data.category_code,
                            category_name: action.data.category_name,
                        }
                    }
            });

        case assortmentConstants.GET_ASSORTMENT_BY_CODE_FAILURE:
            return update(state, {
                $merge:
                    {
                        [action.code]: {
                            loading: false,
                            code: '',
                            system: '',
                            grade: '',
                            colour: '',
                            name: '',
                            category_code: '',
                            category_name: '',
                        }
                    }
            });

        default:
            return state;
    }
}
