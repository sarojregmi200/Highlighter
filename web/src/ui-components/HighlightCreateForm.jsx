/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Highlight } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HighlightCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    xpath: "",
    data: "",
    color: "",
    domain: "",
    time: "",
    topic: "",
    htmlMarkup: "",
  };
  const [xpath, setXpath] = React.useState(initialValues.xpath);
  const [data, setData] = React.useState(initialValues.data);
  const [color, setColor] = React.useState(initialValues.color);
  const [domain, setDomain] = React.useState(initialValues.domain);
  const [time, setTime] = React.useState(initialValues.time);
  const [topic, setTopic] = React.useState(initialValues.topic);
  const [htmlMarkup, setHtmlMarkup] = React.useState(initialValues.htmlMarkup);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setXpath(initialValues.xpath);
    setData(initialValues.data);
    setColor(initialValues.color);
    setDomain(initialValues.domain);
    setTime(initialValues.time);
    setTopic(initialValues.topic);
    setHtmlMarkup(initialValues.htmlMarkup);
    setErrors({});
  };
  const validations = {
    xpath: [{ type: "Required" }],
    data: [{ type: "Required" }],
    color: [{ type: "Required" }],
    domain: [{ type: "Required" }],
    time: [{ type: "Required" }],
    topic: [{ type: "Required" }],
    htmlMarkup: [{ type: "Required" }],
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
          xpath,
          data,
          color,
          domain,
          time,
          topic,
          htmlMarkup,
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
          await DataStore.save(new Highlight(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HighlightCreateForm")}
      {...rest}
    >
      <TextField
        label="Xpath"
        isRequired={true}
        isReadOnly={false}
        value={xpath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath: value,
              data,
              color,
              domain,
              time,
              topic,
              htmlMarkup,
            };
            const result = onChange(modelFields);
            value = result?.xpath ?? value;
          }
          if (errors.xpath?.hasError) {
            runValidationTasks("xpath", value);
          }
          setXpath(value);
        }}
        onBlur={() => runValidationTasks("xpath", xpath)}
        errorMessage={errors.xpath?.errorMessage}
        hasError={errors.xpath?.hasError}
        {...getOverrideProps(overrides, "xpath")}
      ></TextField>
      <TextField
        label="Data"
        isRequired={true}
        isReadOnly={false}
        value={data}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath,
              data: value,
              color,
              domain,
              time,
              topic,
              htmlMarkup,
            };
            const result = onChange(modelFields);
            value = result?.data ?? value;
          }
          if (errors.data?.hasError) {
            runValidationTasks("data", value);
          }
          setData(value);
        }}
        onBlur={() => runValidationTasks("data", data)}
        errorMessage={errors.data?.errorMessage}
        hasError={errors.data?.hasError}
        {...getOverrideProps(overrides, "data")}
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
              xpath,
              data,
              color: value,
              domain,
              time,
              topic,
              htmlMarkup,
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
      <TextField
        label="Domain"
        isRequired={true}
        isReadOnly={false}
        value={domain}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath,
              data,
              color,
              domain: value,
              time,
              topic,
              htmlMarkup,
            };
            const result = onChange(modelFields);
            value = result?.domain ?? value;
          }
          if (errors.domain?.hasError) {
            runValidationTasks("domain", value);
          }
          setDomain(value);
        }}
        onBlur={() => runValidationTasks("domain", domain)}
        errorMessage={errors.domain?.errorMessage}
        hasError={errors.domain?.hasError}
        {...getOverrideProps(overrides, "domain")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath,
              data,
              color,
              domain,
              time: value,
              topic,
              htmlMarkup,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Topic"
        isRequired={true}
        isReadOnly={false}
        value={topic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath,
              data,
              color,
              domain,
              time,
              topic: value,
              htmlMarkup,
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
        label="Html markup"
        isRequired={true}
        isReadOnly={false}
        value={htmlMarkup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              xpath,
              data,
              color,
              domain,
              time,
              topic,
              htmlMarkup: value,
            };
            const result = onChange(modelFields);
            value = result?.htmlMarkup ?? value;
          }
          if (errors.htmlMarkup?.hasError) {
            runValidationTasks("htmlMarkup", value);
          }
          setHtmlMarkup(value);
        }}
        onBlur={() => runValidationTasks("htmlMarkup", htmlMarkup)}
        errorMessage={errors.htmlMarkup?.errorMessage}
        hasError={errors.htmlMarkup?.hasError}
        {...getOverrideProps(overrides, "htmlMarkup")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
