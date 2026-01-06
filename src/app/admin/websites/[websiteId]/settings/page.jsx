import LoaderIcon from "@/app/components/general-components/LoaderIcon"
import SettingsClient from "@/app/admin/clients/SettingsClient";


export default async function Settings({ params }) {

    const { websiteId } = await params;

    // this is website url
    return (
        <SettingsClient websiteUrl={websiteId} />
    )
}