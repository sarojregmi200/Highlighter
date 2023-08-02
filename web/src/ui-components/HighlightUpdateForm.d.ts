/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Highlight } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HighlightUpdateFormInputValues = {
    xpath?: string;
    data?: string;
    color?: string;
    domain?: string;
    time?: string;
    topic?: string;
    htmlMarkup?: string;
};
export declare type HighlightUpdateFormValidationValues = {
    xpath?: ValidationFunction<string>;
    data?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    domain?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    topic?: ValidationFunction<string>;
    htmlMarkup?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HighlightUpdateFormOverridesProps = {
    HighlightUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    xpath?: PrimitiveOverrideProps<TextFieldProps>;
    data?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    domain?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
    htmlMarkup?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HighlightUpdateFormProps = React.PropsWithChildren<{
    overrides?: HighlightUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    highlight?: Highlight;
    onSubmit?: (fields: HighlightUpdateFormInputValues) => HighlightUpdateFormInputValues;
    onSuccess?: (fields: HighlightUpdateFormInputValues) => void;
    onError?: (fields: HighlightUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HighlightUpdateFormInputValues) => HighlightUpdateFormInputValues;
    onValidate?: HighlightUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HighlightUpdateForm(props: HighlightUpdateFormProps): React.ReactElement;
