/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Active } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ActiveUpdateFormInputValues = {
    topic?: string;
    color?: string;
    pen?: boolean;
    background?: boolean;
    underline?: boolean;
};
export declare type ActiveUpdateFormValidationValues = {
    topic?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    pen?: ValidationFunction<boolean>;
    background?: ValidationFunction<boolean>;
    underline?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ActiveUpdateFormOverridesProps = {
    ActiveUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    pen?: PrimitiveOverrideProps<SwitchFieldProps>;
    background?: PrimitiveOverrideProps<SwitchFieldProps>;
    underline?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ActiveUpdateFormProps = React.PropsWithChildren<{
    overrides?: ActiveUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    active?: Active;
    onSubmit?: (fields: ActiveUpdateFormInputValues) => ActiveUpdateFormInputValues;
    onSuccess?: (fields: ActiveUpdateFormInputValues) => void;
    onError?: (fields: ActiveUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActiveUpdateFormInputValues) => ActiveUpdateFormInputValues;
    onValidate?: ActiveUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ActiveUpdateForm(props: ActiveUpdateFormProps): React.ReactElement;
