<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScanModel;

class ScanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $scan;
     
    public function _construct() {
        $this->scan = new ScanModel();
    }

    public function index()
    {
        $scans = $this->scan->all();

        return response()->json($scans);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $query = $this->scan->create([
            'qrData' => $request->qrData,
        ]);

        if ($query) {
            return response()->success('Data saved successfully');
        } else {
            return response()->failed('Data failed to save');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $query = $this->scan->where('id', $id)->update([
            'qrData' => $request->qrData,
        ]);

        if ($query) {
            return response()->success('Data updated successfully');
        } else {
            return response()->failed('Data failed to update');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $query = $this->scan->where('id', $id)->delete();

        if ($query) {
            return response()->success('Data deleted successfully');
        } else {
            return response()->failed('Data failed to delete');
        }
    }
}
