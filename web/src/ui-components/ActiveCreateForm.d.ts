/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ActiveCreateFormInputValues = {
    topic?: string;
    color?: string;
    pen?: boolean;
    background?: boolean;
    underline?: boolean;
};
export declare type ActiveCreateFormValidationValues = {
    topic?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    pen?: ValidationFunction<boolean>;
    background?: ValidationFunction<boolean>;
    underline?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ActiveCreateFormOverridesProps = {
    ActiveCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    pen?: PrimitiveOverrideProps<SwitchFieldProps>;
    background?: PrimitiveOverrideProps<SwitchFieldProps>;
    underline?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ActiveCreateFormProps = React.PropsWithChildren<{
    overrides?: ActiveCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ActiveCreateFormInputValues) => ActiveCreateFormInputValues;
    onSuccess?: (fields: ActiveCreateFormInputValues) => void;
    onError?: (fields: ActiveCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActiveCreateFormInputValues) => ActiveCreateFormInputValues;
    onValidate?: ActiveCreateFormValidationValues;
} & React.CSSProperties>;
export default function ActiveCreateForm(props: ActiveCreateFormProps): React.ReactElement;
