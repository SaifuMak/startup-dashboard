import LoaderIcon from "@/app/components/general-components/LoaderIcon"
import SettingsClient from "@/app/admin/clients/SettingsClient";


export default async function Settings({ params }) {

    const { websiteId } = await params;

   

    return (
        <SettingsClient websiteUrl={websiteId} />
    )
}