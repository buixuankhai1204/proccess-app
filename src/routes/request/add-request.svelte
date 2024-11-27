<script>
    export let closePopup;    let name = '';
    let creator = '';

    async function addRequest() {
        await fetch('/request/api', {
            method: 'POST',
            body: JSON.stringify({ name, creator }),
        });
        closePopup(); // Gọi hàm để đóng popup
    }

    function handleClickOutside(event) {
        if (event.target.classList.contains('popup-backdrop')) {
            closePopup(); // Gọi hàm để đóng popup
        }
    }
</script>

<div class="popup-backdrop" on:click={handleClickOutside}>
    <div class="popup">
        <h2>Add New Request</h2>
        <form on:submit|preventDefault={addRequest}>
            <label>
                Name:
                <input type="text" bind:value={name} required />
            </label>
            <label>
                Creator:
                <input type="text" bind:value={creator} required />
            </label>
            <button type="submit">Submit</button>
            <button type="button" on:click={closePopup}>Cancel</button>
        </form>
    </div>
</div>

<style>
    .popup-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .popup {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        min-width: 300px;
    }

    button {
        margin-right: 10px;
    }
</style>
