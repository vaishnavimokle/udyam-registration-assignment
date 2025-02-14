import ScreenLayout from "@/components/layouts/screenLayout";
import { Button, Text, Group, Badge, Modal } from "@mantine/core";
import {
  ActivityCategory,
  Gender,
  SocialCategory,
  TypeOfOrganisation,
} from "@/constants/addDetails";
import {
  UdyamAddressDetail,
  UdyamBankDetail,
  UdyamEmployeeDetail,
  UdyamRegistrationDetailRequest,
  UdyamUnitDetail,
} from "@/types/udyamRegistration";
import { ReactNode, useState } from "react";
import { udyamAddDetails } from "@/api/udyamRegistration";
import pollForStatus from "@/services/udyam/statusPoller";
import { OTPVerificationType, UdyamRegistrationStage } from "@/constants/udyam";
import { useRouter } from "next/router";
import FormCard from "@/components/udyam/details/formCard";
import BasicDetailForm from "@/components/udyam/details/basicForm";
import EnterpriseDetailForm from "@/components/udyam/details/enterpriseForm";
import ExtraDetailForm from "@/components/udyam/details/extraForm";
import NicCodeForm from "@/components/udyam/details/nicCodeForm";
import UnitDetailForm from "@/components/udyam/details/unitForm";

const AddDetailPage = () => {
  const [udyamDetails, setUdyamDetails] =
    useState<UdyamRegistrationDetailRequest>({
      typeOfOrganisation: TypeOfOrganisation.OTHERS,
      pan: "BLBPC8598L",
      dob: "1935-11-11",
      email: "avinash.chandra@decentro.tech",
      mobile: "9356479551",
      socialCategory: SocialCategory.GENERAL,
      gender: Gender.MALE,
      speciallyAbled: false,
      enterpriseName: "Ninjacart Demo Udyam",
      officialAddress: {
        door: "Example Door",
        premises: "Example Premises",
        town: "Example town",
        block: "Example block",
        road: "Example road",
        city: "Example city",
        district: "KOLHAPUR",
        state: "MAHARASHTRA",
        pincode: "416003",
      },
      enterpriseStatus: {
        dateOfIncorporation: "2024-12-01",
      },
      activityCategory: ActivityCategory.SERVICES,
      tradingServices: false,
      nicCodes: ["10409"],
      numberOfEmployees: {
        male: 1,
        female: 0,
        others: 0,
      },
    });
  const [error, setError] = useState<string>();
  const [openForm, setOpenForm] = useState(false);
  const [formContent, setFromContent] = useState<ReactNode>();

  const router = useRouter();

  const verifyUdyamDetails = (
    udyamDetails: UdyamRegistrationDetailRequest
  ): boolean => {
    if (!udyamDetails.activityCategory ){
      setError("Baseic Details Empty")
      return false
    } 
    return true;
  };

  const handleSubmitDetails = async () => {
    console.log(udyamDetails);
    if (udyamDetails && verifyUdyamDetails(udyamDetails)) {
      const addDetailsResp = await udyamAddDetails(udyamDetails);
      if (addDetailsResp.status == "SUCCESS") {
        const status = await pollForStatus([
          UdyamRegistrationStage.SESSION_DETAILS_ADDITION_SUCCESSFUL,
          UdyamRegistrationStage.SESSION_DETAILS_ADDITION_FAILED_ACTIVE_SESSION,
          UdyamRegistrationStage.SESSION_DETAILS_ADDITION_FAILED,
        ]);
        if (status) {
          if (
            status.data.status ==
            UdyamRegistrationStage.SESSION_DETAILS_ADDITION_SUCCESSFUL
          ) {
            router.push({
              pathname: "/udyam/otp",
              query: {
                type: OTPVerificationType.CONFIRM_REGISTRATION,
                redirectUrl: "/udyam/success",
              },
            });
          }else if (
            status.data.status ==
            UdyamRegistrationStage.SESSION_DETAILS_ADDITION_FAILED_ACTIVE_SESSION
          ) {
            setError(status.data.error
            ? status.data.error.message
            : status.data.description,)
          }
        } else {
          console.log("Poller timed out");
        }
      }
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFromContent(undefined);
  };

  const handleBasicDetailsEdit = () => {
    setFromContent(
      <BasicDetailForm
        pan={udyamDetails.pan}
        nameOnPan={udyamDetails.nameOnPan}
        typeOfOrganisation={udyamDetails.typeOfOrganisation}
        dob={udyamDetails.dob}
        email={udyamDetails.email}
        mobile={udyamDetails.mobile}
        socialCategory={udyamDetails.socialCategory}
        gender={udyamDetails.gender}
        speciallyAbled={udyamDetails.speciallyAbled}
        onSubmit={(updatedDetails) => {
          setUdyamDetails((prevDetails) => ({
            ...prevDetails,
            pan: updatedDetails.pan,
            nameOnPan: updatedDetails.nameOnPan,
            typeOfOrganisation: updatedDetails.typeOfOrganisation,
            dob: updatedDetails.dob,
            email: updatedDetails.email,
            mobile: updatedDetails.mobile,
            socialCategory: updatedDetails.socialCategory,
            gender: updatedDetails.gender,
            speciallyAbled: updatedDetails.speciallyAbled,
          }));
          handleCloseForm();
        }}
      />
    );
    setOpenForm(true);
  };

  const handleEnterpriseDetailsEdit = () => {
    setFromContent(
      <EnterpriseDetailForm
        enterpriseName={udyamDetails.enterpriseName}
        activityCategory={udyamDetails.activityCategory}
        tradingServices={udyamDetails.tradingServices}
        officialAddress={udyamDetails.officialAddress}
        enterpriseStatus={udyamDetails.enterpriseStatus}
        onSubmit={(updatedDetails) => {
          setUdyamDetails((prevDetails) => ({
            ...prevDetails,
            activityCategory: updatedDetails.activityCategory,
            enterpriseName: updatedDetails.enterpriseName,
            enterpriseStatus: updatedDetails.enterpriseStatus,
            officialAddress: updatedDetails.officialAddress,
            tradingServices: updatedDetails.tradingServices,
          }));
          handleCloseForm();
        }}
      />
    );
    setOpenForm(true);
  };

  const handleExtraDetailsEdit = () => {
    setFromContent(
      <ExtraDetailForm
        bankDetails={udyamDetails.bankDetails}
        numberOfEmployees={udyamDetails.numberOfEmployees}
        onSubmit={(updatedDetails) => {
          setUdyamDetails((prevDetails) => ({
            ...prevDetails,
            bankDetails: updatedDetails.bankDetails,
            numberOfEmployees: updatedDetails.numberOfEmployees,
          }));
          handleCloseForm();
        }}
      />
    );
    setOpenForm(true);
  };

  const handleNicCodesEdit = () => {
    setFromContent(
      <NicCodeForm
        nicCodes={udyamDetails.nicCodes}
        onSubmit={(updatedDetails) => {
          setUdyamDetails((prevDetails) => ({
            ...prevDetails,
            nicCodes: updatedDetails.nicCodes,
          }));
          handleCloseForm();
        }}
      />
    );
    setOpenForm(true);
  };

  const handleUnitListEdit = () => {
    setFromContent(
      <UnitDetailForm
        units={udyamDetails.units}
        onSubmit={(updatedDetails) => {
          setUdyamDetails((prevDetails) => ({
            ...prevDetails,
            units: updatedDetails.units,
          }));
          handleCloseForm();
        }}
      />
    );
    setOpenForm(true);
  };

  const formatAddress = (address: UdyamAddressDetail | UdyamUnitDetail) => {
    return `${address.door}, ${address.premises}, ${address.town}, ${address.block}, ${address.road}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}`;
  };

  return (
    <ScreenLayout title="Udyam Registration - Add Details">
      <div className="w-full flex flex-col justify-around p-8">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <FormCard
                  title="Basic Details"
                  onEditClick={handleBasicDetailsEdit}
                >
                  <div className="text-sm flex flex-col gap-2">
                    <FormLabel
                      label="Name on PAN"
                      value={udyamDetails.nameOnPan}
                    />
                    <div className="grid grid-cols-2">
                      <FormLabel label="PAN" value={udyamDetails.pan} />
                      <FormLabel
                        label="Type of Org"
                        value={udyamDetails.typeOfOrganisation}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <FormLabel
                        label="Date of Birth"
                        value={udyamDetails.dob}
                      />
                      <FormLabel label="Email" value={udyamDetails.email} />
                      <FormLabel label="Mobile" value={udyamDetails.mobile} />
                    </div>

                    <div className="grid grid-cols-3">
                      <FormLabel
                        label="Social Category"
                        value={udyamDetails.socialCategory}
                      />
                      <FormLabel label="Gender" value={udyamDetails.gender} />
                      <FormLabel
                        label="Specially Abled"
                        value={udyamDetails.speciallyAbled ? "Yes" : "No"}
                      />
                    </div>
                  </div>
                </FormCard>
                <FormCard
                  title="Enterprise Details"
                  onEditClick={handleEnterpriseDetailsEdit}
                >
                  <div className="flex flex-col gap-2">
                    <FormLabel
                      label="Enterprise Name"
                      value={udyamDetails.enterpriseName}
                    />
                    <FormLabel
                      label="Activity Category"
                      value={udyamDetails.activityCategory}
                    />
                    <FormLabel
                      label="Trading Services"
                      value={udyamDetails.tradingServices ? "Yes" : "No"}
                    />
                    <FormLabel
                      label="Official Address"
                      value={formatAddress(udyamDetails.officialAddress)}
                    />
                    <FormLabel
                      label="Date of Incorporation"
                      value={udyamDetails.enterpriseStatus.dateOfIncorporation}
                    />
                    <FormLabel
                      label="Date of Commencement"
                      value={udyamDetails.enterpriseStatus.dateOfCommencement}
                    />
                  </div>
                </FormCard>
                <FormCard
                  title="Additional Details"
                  onEditClick={handleExtraDetailsEdit}
                >
                  <div className="flex flex-col gap-2">
                    <FormLabel
                      label="Account Number"
                      value={udyamDetails.bankDetails?.accountNumber}
                    />
                    <FormLabel
                      label="IFSC"
                      value={udyamDetails.bankDetails?.ifscCode}
                    />
                    <FormLabel
                      label="Male Employees"
                      value={"" + udyamDetails.numberOfEmployees?.male}
                    />
                    <FormLabel
                      label="Female Employees"
                      value={"" + udyamDetails.numberOfEmployees?.female}
                    />
                    <FormLabel
                      label="Other Employees"
                      value={"" + udyamDetails.numberOfEmployees?.others}
                    />
                  </div>
                </FormCard>
                <FormCard
                  title="NIC Code List"
                  onEditClick={handleNicCodesEdit}
                >
                  <div className="flex flex-wrap gap-4">
                    {udyamDetails?.nicCodes.map((nicCode) => (
                      <Badge
                        variant="gradient"
                        gradient={{ from: "#096ef2", to: "#0092ff", deg: 90 }}
                      >
                        {nicCode}
                      </Badge>
                    ))}
                  </div>
                </FormCard>
                <FormCard title="Unit List" onEditClick={handleUnitListEdit}>
                    <div className="flex flex-col gap-2">
                      {udyamDetails.units?.map((unit, index) => (
                        <FormLabel
                          label={`Unit # ${index}`}
                          value={formatAddress(unit)}
                        />
                      ))}
                    </div>
                </FormCard>
              </div>

              <div className="w-full flex justify-around">
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Button onClick={handleSubmitDetails} fullWidth>
                    Submit
                  </Button>
                  {error && (
                    <span className="text-red-600 text-wrap">
                      Error: {error}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        radius="md"
        title="Add Details"
        opened={openForm}
        onClose={handleCloseForm}
        size="lg"
      >
        {formContent}
      </Modal>
    </ScreenLayout>
  );
};

export default AddDetailPage;

type FormLabelProsp = {
  label: string;
  value?: string;
};

const FormLabel = ({ label, value }: FormLabelProsp) => {
  return (
    <div className="text-sm flex flex-col">
      <span className="text-gray-600 text-xs">{label}</span>
      <span>{value || "N/A"}</span>
    </div>
  );
};
