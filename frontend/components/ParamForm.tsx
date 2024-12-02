"use client";
import { useForm } from "react-hook-form";
import { FormType } from "@/lib/utils/types";
import { useState } from "react";
import React from "react";
import OptionButton from "./OptionButton";
import Button from "./Button";
import { queries } from "@/lib/utils/data";
import { ResultDocProps } from "@/lib/utils/types";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const ParamForm: React.FC<ResultDocProps> = ({ setResult }) => {
  const { register, handleSubmit } = useForm<FormType>();
  const [byPassList, setByPassList] = useState(false);
  const [seedQuery, setSeedQuery] = useState(true);
  const [customPMI, setCustomPMI] = useState(true);
  const [isDebugTooltipVisible, setIsDebugTooltipVisible] = useState(false);

  // State to track the height of the textarea
  const [heightIgnoreList, setHeightIgnoreList] = useState<string>("auto");
  const [heightQueryText, setHeightQueryText] = useState<string>("auto");

  const defaultFormData = {
    embeddingKeyMinSize: "2",
    embeddingValuesMinSize: "2",
    min_pmi: "0.00",
    Customized_pmi: true,
    ContextMultitokenMinSize: "2",
    maxTokenCount: "100",
    minOutputListSize: "1",
    nABmin: "1",
    ignoreList: "data,",
    queryText: queries[0],
  };

  const minFormData = {
    embeddingKeyMinSize: "1",
    embeddingValuesMinSize: "1",
    min_pmi: "0.00",
    Customized_pmi: true,
    ContextMultitokenMinSize: "1",
    maxTokenCount: "100",
    minOutputListSize: "1",
    nABmin: "1",
    ignoreList: "data,",
    queryText: queries[0],
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOptionButtonClickCustomPMI = (option: boolean) => {
    // console.log("custom pmi", option);
    setCustomPMI(option);
  };
  const handleOptionButtonClickIgnoreList = (option: boolean) => {
    // console.log("bypass", option);
    setByPassList(option);
  };

  const handleOptionButtonClickQuery = (option: boolean) => {
    // console.log("query", option);
    setSeedQuery(option);
  };

  const handleResetButtonClick = () => {
    window.location.reload(); // Refresh the page

    // setFormData(defaultFormData);
    // setResult({ embeddings: [], docs: [] });
    // setCustomPMI(true);
    // setByPassList(false);
    // setSeedQuery(true);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   queryText: queries[0],
    // }));
  };

  const showDebugTooltip = () => {
    setIsDebugTooltipVisible(true);
  };

  const hideDebugTooltip = () => {
    setIsDebugTooltipVisible(false);
  };

  const handleDebugButtonClick = () => {
    console.log(`Debug formdata: ${JSON.stringify(formData)}`); // Log the formData);
    console.log(`Debug minformdata: ${JSON.stringify(minFormData)}`); // Log the minformData);
    setFormData(() => ({
      ...minFormData,
      queryText:
        formData.queryText?.length > 0 ? formData.queryText : queries[0],
    }));
  };

  // Handle focus event to increase the height
  const handleFocusIgnoreList = () => {
    setHeightIgnoreList("150px");
  };

  const handleFocusQueryText = () => {
    setHeightQueryText("150px");
  };

  // Handle blur event to reset the height
  const handleBlurIgnoreList = () => {
    setHeightIgnoreList("auto"); // Reset to original size (or you can specify a fixed height)
  };

  const handleBlurQueryText = () => {
    setHeightQueryText("auto"); // Reset to original size (or you can specify a fixed height)
  };

  // const retrieveDocs = async (data: Object) => {
  const retrieveDocs = async () => {
    const data = {
      ...formData,
      bypassIgnoreList: byPassList ? 1 : 0,
      Customized_pmi: customPMI,
    };

    if (data) {
      console.log(data);
    } else {
      console.log("No data found");
    }
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/api/docs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result_data = await response.json();
      // print length of the result list

      if (result_data) {
        // console.log(result_data.length);
        setResult(result_data);
      } else {
        console.log("No result found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-1 border border-bondingai_input_border/[0.60] rounded-md mt-2">
      <h2 className="text-slate-100 mb-3 text-center">Parameters</h2>
      {/* <Slider defaultValue={[33]} max={100} step={1} className="bg-white" /> */}
      <form onSubmit={handleSubmit(retrieveDocs)} className="w-full">
        <fieldset className="border rounded-md border-bondingai_input_border/[0.60] p-2 mb-4">
          <legend className="text-bondingai_input_label text-sm">Embedding</legend>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                className="text-bondingai_input_label text-sm"
                htmlFor="embeddingKeyMinSize"
              >
                Key Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingKeyMinSize", { required: true })}
                value={formData.embeddingKeyMinSize}
                min="1"
                max="3"
                step="1"
                onChange={(event) => handleInputChange(event)}
                className="bg-bondingai_primary border border-bondingai_input_border/[0.60] text-slate-300 text-sm rounded-md w-40 p-1"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="text-bondingai_input_label text-sm"
                htmlFor="embeddingValuesMinSize"
              >
                Values Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingValuesMinSize", { required: true })}
                value={formData.embeddingValuesMinSize}
                onChange={(event) => handleInputChange(event)}
                min="1"
                max="3"
                step="1"
                className="bg-bondingai_primary border border-bondingai_input_border/[0.60] text-slate-300 text-sm rounded-md w-40 p-1"
              />
            </div>
          </div>
        </fieldset>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm" htmlFor="min_pmi">
              Min. PMI
            </label>
            <input
              type="number"
              {...register("min_pmi", { required: true })}
              value={formData.min_pmi}
              onChange={(event) => handleInputChange(event)}
              min="0.00"
              max="2.00"
              step="0.01"
              className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm" htmlFor="Customized_pmi">
              Custom PMI
            </label>
            <OptionButton
              handleOptionButtonClick={handleOptionButtonClickCustomPMI}
              selectedOption={customPMI}
              option1="Yes"
              option2="No"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="text-bondingai_input_label text-sm"
              htmlFor="minOutputListSize"
            >
              Min. Out. List Size
            </label>
            <input
              type="number"
              {...register("minOutputListSize", { required: true })}
              value={formData.minOutputListSize}
              onChange={(event) => handleInputChange(event)}
              min="1"
              max="2"
              step="1"
              className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm" htmlFor="nABmin">
              nABmin
            </label>
            <input
              type="number"
              {...register("nABmin", { required: true })}
              value={formData.nABmin}
              onChange={(event) => handleInputChange(event)}
              min="1"
              max="3"
              step="1"
              className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="text-bondingai_input_label text-sm"
              htmlFor="ContextMultitokenMinSize"
            >
              Ctxt. Multitoken Min. Size
            </label>
            <input
              type="number"
              {...register("ContextMultitokenMinSize", { required: true })}
              value={formData.ContextMultitokenMinSize}
              onChange={(event) => handleInputChange(event)}
              min="1"
              max="3"
              step="1"
              className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm" htmlFor="maxTokenCount">
              Max. Token Count
            </label>
            <input
              type="number"
              {...register("maxTokenCount", { required: true })}
              value={formData.maxTokenCount}
              min="5"
              max="200"
              step="1"
              onChange={(event) => handleInputChange(event)}
              className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm">Bypass Ignore List</label>
            <OptionButton
              handleOptionButtonClick={handleOptionButtonClickIgnoreList}
              selectedOption={byPassList}
              option1="Yes"
              option2="No"
            />
          </div>
          {byPassList === false && (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="text-bondingai_input_label text-sm" htmlFor="ignoreList">
                Ignore List (Comma Sep.)
              </label>
              <textarea
                {...register("ignoreList", { required: true })}
                value={formData.ignoreList}
                onChange={(event) => handleInputChange(event)}
                placeholder="data,.."
                className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1 transition-all duration-300 ease-in-out"
                style={{ height: `${heightIgnoreList}` }} // Apply dynamic height
                onFocus={handleFocusIgnoreList}
                onBlur={handleBlurIgnoreList}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-bondingai_input_label text-sm">Query</label>
            <OptionButton
              handleOptionButtonClick={handleOptionButtonClickQuery}
              selectedOption={seedQuery}
              option1="Seeded"
              option2="Custom"
            />
          </div>
          {seedQuery === true ? (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <br />
              <select
                {...register("queryText", { required: true })}
                className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm h-2/3 rounded-md w-40 p-1"
                onChange={(event) => handleInputChange(event)}
              >
                {queries.map((query, index) => {
                  return (
                    <option key={index} value={query}>
                      {query}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <br />
              <textarea
                {...register("queryText", { required: true })}
                value={formData.queryText}
                onChange={(event) => handleInputChange(event)}
                placeholder="parameterized datasets map tables sql server..."
                className="bg-bondingai_primary border border-bondingai_input_border text-slate-300 text-sm rounded-md w-40 p-1 transition-all duration-300 ease-in-out"
                style={{ height: `${heightQueryText}` }} // Apply dynamic height
                onFocus={handleFocusQueryText}
                onBlur={handleBlurQueryText}
              />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-4 px-3 mb-4">
          <Button buttonType="submit">Retrieve Docs</Button>
          {/* <Link href="/" passHref onClick={handleResetButtonClick}> */}
          <Button buttonType="button" onClick={handleResetButtonClick}>
            Reset
          </Button>
          {/* </Link> */}
          <div className="relative inline-block group">
            <Button buttonType="button" onClick={handleDebugButtonClick}>
              Debug
            </Button>
            <div
              id="tooltip-debug"
              data-tooltip-placement="top"
              className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white top-[-60px] left-[-40px] transform transition-opacity duration-300 w-40"
            >
              Debug resets numeric inputs to their minimum values.
            </div>
          </div>
          {/* <Link
            href="/"
            passHref
            onClick={handleDebugButtonClick}
            className="relative inline-block group"
          > */}
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};
export default ParamForm;
