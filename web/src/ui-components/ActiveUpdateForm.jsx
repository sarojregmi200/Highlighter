/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Active } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ActiveUpdateForm(props) {
  const {
    id: idProp,
    active: activeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    topic: "",
    color: "",
    pen: false,
    background: false,
    underline: false,
  };
  const [topic, setTopic] = React.useState(initialValues.topic);
  const [color, setColor] = React.useState(initialValues.color);
  const [pen, setPen] = React.useState(initialValues.pen);
  const [background, setBackground] = React.useState(initialValues.background);
  const [underline, setUnderline] = React.useState(initialValues.underline);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = activeRecord
      ? { ...initialValues, ...activeRecord }
      : initialValues;
    setTopic(cleanValues.topic);
    setColor(cleanValues.color);
    setPen(cleanValues.pen);
    setBackground(cleanValues.background);
    setUnderline(cleanValues.underline);
    setErrors({});
  };
  const [activeRecord, setActiveRecord] = React.useState(activeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Active, idProp)
        : activeModelProp;
      setActiveRecord(record);
    };
    queryData();
  }, [idProp, activeModelProp]);
  React.useEffect(resetStateValues, [activeRecord]);
  const validations = {
    topic: [{ type: "Required" }],
    color: [{ type: "Required" }],
    pen: [{ type: "Required" }],
    background: [{ type: "Required" }],
    underline: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          topic,
          color,
          pen,
          background,
          underline,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Active.copyOf(activeRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ActiveUpdateForm")}
      {...rest}
    >
      <TextField
        label="Topic"
        isRequired={true}
        isReadOnly={false}
        value={topic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              topic: value,
              color,
              pen,
              background,
              underline,
            };
            const result = onChange(modelFields);
            value = result?.topic ?? value;
          }
          if (errors.topic?.hasError) {
            runValidationTasks("topic", value);
          }
          setTopic(value);
        }}
        onBlur={() => runValidationTasks("topic", topic)}
        errorMessage={errors.topic?.errorMessage}
        hasError={errors.topic?.hasError}
        {...getOverrideProps(overrides, "topic")}
      ></TextField>
      <TextField
        label="Color"
        isRequired={true}
        isReadOnly={false}
        value={color}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              topic,
              color: value,
              pen,
              background,
              underline,
            };
            const result = onChange(modelFields);
            value = result?.color ?? value;
          }
          if (errors.color?.hasError) {
            runValidationTasks("color", value);
          }
          setColor(value);
        }}
        onBlur={() => runValidationTasks("color", color)}
        errorMessage={errors.color?.errorMessage}
        hasError={errors.color?.hasError}
        {...getOverrideProps(overrides, "color")}
      ></TextField>
      <SwitchField
        label="Pen"
        defaultChecked={false}
        isDisabled={false}
        isChecked={pen}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              topic,
              color,
              pen: value,
              background,
              underline,
            };
            const result = onChange(modelFields);
            value = result?.pen ?? value;
          }
          if (errors.pen?.hasError) {
            runValidationTasks("pen", value);
          }
          setPen(value);
        }}
        onBlur={() => runValidationTasks("pen", pen)}
        errorMessage={errors.pen?.errorMessage}
        hasError={errors.pen?.hasError}
        {...getOverrideProps(overrides, "pen")}
      ></SwitchField>
      <SwitchField
        label="Background"
        defaultChecked={false}
        isDisabled={false}
        isChecked={background}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              topic,
              color,
              pen,
              background: value,
              underline,
            };
            const result = onChange(modelFields);
            value = result?.background ?? value;
          }
          if (errors.background?.hasError) {
            runValidationTasks("background", value);
          }
          setBackground(value);
        }}
        onBlur={() => runValidationTasks("background", background)}
        errorMessage={errors.background?.errorMessage}
        hasError={errors.background?.hasError}
        {...getOverrideProps(overrides, "background")}
      ></SwitchField>
      <SwitchField
        label="Underline"
        defaultChecked={false}
        isDisabled={false}
        isChecked={underline}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              topic,
              color,
              pen,
              background,
              underline: value,
            };
            const result = onChange(modelFields);
            value = result?.underline ?? value;
          }
          if (errors.underline?.hasError) {
            runValidationTasks("underline", value);
          }
          setUnderline(value);
        }}
        onBlur={() => runValidationTasks("underline", underline)}
        errorMessage={errors.underline?.errorMessage}
        hasError={errors.underline?.hasError}
        {...getOverrideProps(overrides, "underline")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || activeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || activeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
