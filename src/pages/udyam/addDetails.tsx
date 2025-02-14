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
  UdyamRegistrationDetailRequest,
} from "@/types/udyamRegistration";
import { ReactNode, useState } from "react";
import { udyamAddDetails } from "@/api/udyamRegistration";
import pollForStatus from "@/services/udyam/statusPoller";
import { OTPVerificationType, UdyamRegistrationStage } from "@/constants/udyam";
import { useRouter } from "next/router";
import FormCard from "@/components/udyam/details/formCard";
import BasicDetailForm from "@/components/udyam/details/basicForm";
import EnterpriseDetailForm from "@/components/udyam/details/enterpriseForm";

const AddDetailPage = () => {
  const [udyamDetails, setUdyamDetails] =
    useState<UdyamRegistrationDetailRequest>({
      typeOfOrganisation: TypeOfOrganisation.CO_OPERATIVE,
      pan: "",
      dob: "",
      email: "",
      mobile: "",
      socialCategory: SocialCategory.GENERAL,
      gender: Gender.MALE,
      speciallyAbled: false,
      enterpriseName: "",
      units: [],
      officialAddress: {
        door: "",
        premises: "",
        town: "",
        block: "",
        road: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        stateValue: "",
        districtValue: "",
      },
      enterpriseStatus: {
        dateOfIncorporation: "",
        dateOfCommencement: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
      },
      activityCategory: ActivityCategory.MANUFACTURING,
      tradingServices: false,
      nicCodes: ["asdsad", "asdddd"],
      numberOfEmployees: {
        male: 0,
        female: 0,
        others: 0,
      },
      nameOnPan: "",
    });
  const [error, setError] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [formContent, setFromContent] = useState<ReactNode>();

  const router = useRouter();

  const verifyUdyamDetails = (
    udyamDetails: UdyamRegistrationDetailRequest
  ): boolean => {
    return true;
  };

  const handleSubmitDetails = async () => {
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
                type: OTPVerificationType.VERIFY_SESSION,
                redirectUrl: "/udyam/success",
              },
            });
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

  const formatAddress = (address: UdyamAddressDetail) => {
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
                  onEditClick={handleBasicDetailsEdit}
                >
                  <Text size="sm" c="dimmed">
                    With Fjord Tours you can explore more of the magical fjord
                    landscapes with tours and activities on and around the
                    fjords of Norway
                  </Text>
                </FormCard>
                <FormCard
                  title="NIC Code List"
                  onEditClick={handleBasicDetailsEdit}
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
                  {!udyamDetails?.nicCodes && (
                    <Text size="sm" c="dimmed">
                      Please add NIC Codes
                    </Text>
                  )}
                </FormCard>
                <FormCard
                  title="Unit List"
                  onEditClick={handleBasicDetailsEdit}
                >
                  {!udyamDetails?.nicCodes && (
                    <Text size="sm" c="dimmed">
                      No units added
                    </Text>
                  )}
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
