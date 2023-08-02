/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HighlightCreateFormInputValues = {
    xpath?: string;
    data?: string;
    color?: string;
    domain?: string;
    time?: string;
    topic?: string;
    htmlMarkup?: string;
};
export declare type HighlightCreateFormValidationValues = {
    xpath?: ValidationFunction<string>;
    data?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    domain?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    topic?: ValidationFunction<string>;
    htmlMarkup?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HighlightCreateFormOverridesProps = {
    HighlightCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    xpath?: PrimitiveOverrideProps<TextFieldProps>;
    data?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    domain?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
    htmlMarkup?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HighlightCreateFormProps = React.PropsWithChildren<{
    overrides?: HighlightCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HighlightCreateFormInputValues) => HighlightCreateFormInputValues;
    onSuccess?: (fields: HighlightCreateFormInputValues) => void;
    onError?: (fields: HighlightCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HighlightCreateFormInputValues) => HighlightCreateFormInputValues;
    onValidate?: HighlightCreateFormValidationValues;
} & React.CSSProperties>;
export default function HighlightCreateForm(props: HighlightCreateFormProps): React.ReactElement;
